import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import morgan from 'morgan'
import cors from 'cors'
import postRoutes from './routes/postRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { Server } from "socket.io";

import { VerifyToken, VerifySocketToken } from "./middleware/authMiddleware.js";

import chatRoomRoutes from "./routes/chatRoom.js";

import chatMessageRoutes from "./routes/chatMessage.js";
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import User from './models/userModel.js'




dotenv.config()

connectDB()

const app = express()


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}


app.use(express.json())
app.use(cors())



app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)
app.use("/api/room", chatRoomRoutes);
app.use("/api/message", chatMessageRoutes);


const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)

const io = new Server(server, {
  cors: {
    origin: "https://mgpost.onrender.com/",
    credentials: true,
  },
});


global.onlineUsers = new Map();

const getKey = (map, val) => {
  for (let [key, value] of map.entries()) {
    if (value === val) return key;
  }
};

io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("addUser", (userId) => {
    onlineUsers.set(userId, socket.id);
    socket.emit("getUsers", Array.from(onlineUsers));
  });

  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    const sendUserSocket = onlineUsers.get(receiverId);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("getMessage", {
        senderId,
        message,
      });
    }
  });

  socket.on("disconnect", () => {
    onlineUsers.delete(getKey(onlineUsers, socket.id));
    socket.emit("getUsers", Array.from(onlineUsers));
  });
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = process.env.JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `/reset-password/${oldUser._id}/${token}`;
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
      }
    });
    var mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(link);
  } catch (error) {}
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }

  const secret = JWT_SECRET;
  try {
    const verify = jwt.verify(token, secret);
    
    // Redirect to the frontend URL with query parameters
    res.redirect(`/reset-password?email=${verify.email}&status=not-verified`);
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});


app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  
  const secret = JWT_SECRET;
  try {
    const verify = jwt.verify(token, secret);
    
    // Encrypt the new password
    const encryptedPassword = await bcrypt.hash(password, 10);
    
    // Update the user's password
    await User.updateOne(
      { _id: id },
      { $set: { password: encryptedPassword } }
    );

    // Respond with a success message or redirect URL
    res.json({ status: "Password Updated Successfully", email: verify.email });
    // Or if you want to redirect, you can use:
    res.redirect(`/login?status=reset-success`);
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});



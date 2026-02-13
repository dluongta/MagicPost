import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import morgan from 'morgan';
import cors from 'cors';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { Server } from "socket.io";
import chatRoomRoutes from "./routes/chatRoom.js";
import chatMessageRoutes from "./routes/chatMessage.js";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from './models/userModel.js';
import bcrypt from 'bcrypt';

dotenv.config();
connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors({
  origin: 'https://mgpost.onrender.com',
  credentials: true,
}));

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use("/api/room", chatRoomRoutes);
app.use("/api/message", chatMessageRoutes);

app.post("/api/forgot-password", async (req, res) => {
  const { email } = req.body;
  console.log("Received email:", email);

  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.status(404).json({ status: "User Not Exists!!" });
    }

    const secret = process.env.JWT_SECRET + oldUser.password; // Ensure secret consistency
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "5m" });
    const link = `https://mgpost.onrender.com/api/reset-password/${oldUser._id}/${token}`;

    // Create a transporter using Nodemailer
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // QUAN TRỌNG
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_APP_PASSWORD,
  },
});



    const mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: "Password Reset",
      html: `
        <p>Click this link to reset your password:</p>
        <a href="${link}" target="_blank">${link}</a>
      `,
    };

try {
  await transporter.sendMail(mailOptions);
  console.log("Mail sent");
} catch (error) {
  console.error("Mail error:", error.message);
}
    console.log("Email sent successfully:", link);
    res.json({ status: "Reset Link Sent" });

  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ status: "Internal Server Error", error: error.message });
  }
});

app.get("/api/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.status(404).json({ status: "User Not Exists!!" });
  }

  const secret = process.env.JWT_SECRET + oldUser.password; // Ensure secret consistency
  try {
    const verify = jwt.verify(token, secret);
    // Redirect to the frontend reset password page
    res.redirect(`/reset-password/${id}/${token}`);
  } catch (error) {
    console.log("Token verification error:", error);
    res.status(403).json({ status: "Not Verified", error: error.message });
  }
});

app.post("/api/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.status(404).json({ status: "User Not Exists!!" });
  }

  const secret = process.env.JWT_SECRET + oldUser.password; // Ensure secret consistency
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);

    await User.updateOne(
      { _id: id },
      { $set: { password: encryptedPassword } }
    );

    res.json({ status: "Password Updated Successfully", email: verify.email });
  } catch (error) {
    console.log("Error during password reset:", error);
    res.status(500).json({ status: "Something Went Wrong", error: error.message });
  }
});



app.get("/api/validate/:token", async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isValidated = true;
    user.validationToken = undefined;
    user.verificationExpiresAt = undefined; 
    await user.save();

    res.redirect("/account-verified"); 
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
});
app.post('/resend-verification', async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user || user.isValidated) {
    return res.status(400).json({ message: "User not found or already validated." });
  }

  // Generate a new validation token
  const validationToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
  user.validationToken = validationToken;
  await user.save();

  const link = `https://mgpost.onrender.com/api/validate/${validationToken}`;

  // Send verification email
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // QUAN TRỌNG
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_APP_PASSWORD,
  },
});


  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: "Account Verification",
    html: `Click this link to verify your account: <a href="${link}">${link}</a>`,
  };

  try {
  await transporter.sendMail(mailOptions);
  console.log("Mail sent");
} catch (error) {
  console.error("Mail error:", error.message);
}
;
  res.json({ message: "Verification email sent." });
});




const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

const io = new Server(server, {
  cors: {
    origin: "https://mgpost.onrender.com",
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

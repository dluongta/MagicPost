import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';


/* =========================
   LOGIN
========================= */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error('No Account Found');
  }

  // Không cho login nếu chưa verify
  if (!user.isValidated) {
    res.status(401);
    throw new Error('Please verify your email before logging in');
  }

  if (await user.matchPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isValidated: user.isValidated,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});


/* =========================
   REGISTER
========================= */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = new User({
    name,
    email,
    password,
  });

  //Token chỉ có hiệu lực 3 phút
  const validationToken = jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '3m' }
  );

  user.validationToken = validationToken;

  await user.save();

  const link = `https://mgpost.onrender.com/api/users/validate/${validationToken}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: 'Account Verification',
    html: `
      <p>Click the link below to verify your account:</p>
      <a href="${link}">${link}</a>
      <p>This link will expire in 3 minutes.</p>
    `,
  });

  res.status(201).json({
    message: 'Registration successful! Please check your email to verify your account.',
  });
});


/* =========================
   VERIFY ACCOUNT
========================= */
const validateUser = asyncHandler(async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      email: decoded.email,
      validationToken: token,
    });

    if (!user) {
      res.status(400);
      throw new Error('Invalid verification token');
    }

    user.isValidated = true;
    user.validationToken = undefined;

    user.verificationExpiresAt = undefined;


    await user.save();

    res.json({ message: 'Account verified successfully!' });

  } catch (error) {

    // Token hết hạn sau 3 phút
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({
        message: 'Verification link expired. Please register again.',
      });
    }

    return res.status(400).json({
      message: 'Invalid verification token',
    });
  }
});


/* =========================
   PROFILE
========================= */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isValidated: user.isValidated,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});


/* =========================
   ADMIN FUNCTIONS
========================= */
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  authUser,
  registerUser,
  validateUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};

import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken'; // Ensure this import is present
import nodemailer from 'nodemailer'; // Ensure this import is present


// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });

  // Check if user exists
  if (!user) {
    res.status(401);
    throw new Error('No Account Found');
  }
  // Check if the password matches
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

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User({
    name,
    email,
    password,
  });

  // Generate validation token
// Token hết hạn sau 3 phút
const validationToken = jwt.sign(
  { email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: "3m" }
);

user.validationToken = validationToken;

// Set thời gian hết hạn cho TTL (3 phút)
user.verificationExpiresAt = new Date(Date.now() + 3 * 60 * 1000);


  await user.save();

  const link = `https://mgpost.onrender.com/api/validate/${validationToken}`;

  // Send validation email
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: "Account Verification",
    html: `<p>Click this link to verify your account: <a href="${link}">${link}</a>.</p>
     <p>Your Verification Is Expired After 3 Minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
  
  // Redirect user if account is not validated
  if (!user.isValidated) {
    return res.status(201).json({
      message: "Registration successful! Check your email to verify your account."
    });
  }

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(user)


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

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name || user.name,
        email: req.body.email || user.email,
        password: req.body.password ? req.body.password : user.password, // Keep existing password if not updating
      },
      { new: true } // Return the updated document
    );

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

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name || user.name,
        email: req.body.email || user.email,
        isAdmin: req.body.isAdmin,
      },
      { new: true } // Return the updated document
    );

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Function to delete unvalidated users
// const deleteUnvalidatedUsers = async () => {
//   try {
//     const cutoffDate = new Date(Date.now() - 3 * 60 * 1000); // 3 minutes ago
//     const result = await User.deleteMany({ 
//       isValidated: false,
//       createdAt: { $lt: cutoffDate }
//     });
//     console.log(`Deleted ${result.deletedCount} unvalidated users.`);
//   } catch (error) {
//     console.error('Error deleting unvalidated users:', error);
//   }
// };

// // Set up an interval to run the function every minute
// setInterval(deleteUnvalidatedUsers, 60 * 1000); // Every 60 seconds

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utility/sendEmail");
const crypto = require("crypto");

const generateToken = (user, userAgent) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      userAgent,
      deviceId: user.deviceId,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const userAgent = req.headers["user-agent"];
    const deviceId = crypto.randomBytes(16).toString("hex");

    user.deviceId = deviceId;
    await user.save();

    const token = generateToken(user, userAgent);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        picture: user.picture,
        authProvider: user.authProvider,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handleSignup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    const userAgent = req.headers["user-agent"];
    const deviceId = crypto.randomBytes(16).toString("hex");
    newUser.deviceId = deviceId;
    
    await newUser.save();

    // Send welcome email
    await sendEmail({
      to: email,
      subject: "Welcome to Our Service",
      html: `<h1>Hello ${name}</h1><p>Thank you for signing up! We're excited to have you on board.</p><p>Best regards,<br>The Team</p>`,
    });

    const token = generateToken(newUser, userAgent);

    res.status(201).json({ 
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        picture: newUser.picture,
        authProvider: newUser.authProvider
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handleLogout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const handleForgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate 6-digit code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetCodeExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save reset code to user
    user.resetCode = resetCode;
    user.resetCodeExpires = resetCodeExpires;
    await user.save();

    // Send email
    const emailSent = await sendEmail({
      to: email,
      subject: "Password Reset Code",
      html: `<h1>Password Reset</h1><p>Your password reset code is: <strong>${resetCode}</strong></p><p>This code will expire in 10 minutes.</p>`,
    });

    if (!emailSent) {
      return res.status(500).json({ error: "Failed to send reset code" });
    }

    res.status(200).json({ message: "Reset code sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleVerifyResetCode = async (req, res) => {
  const { email, resetCode } = req.body;

  try {
    const user = await User.findOne({
      email,
      resetCode,
      resetCodeExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired reset code" });
    }

    res.status(200).json({ message: "Reset code verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleResetPassword = async (req, res) => {
  console.log("Reset password request received:", req.body);
  const { email, resetCode, newPassword } = req.body;

  if (!email || !resetCode || !newPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    console.log("Finding user with email and reset code...");
    const user = await User.findOne({
      email,
      resetCode,
      resetCodeExpires: { $gt: Date.now() },
    });

    if (!user) {
      console.log("No user found or reset code expired");
      return res.status(400).json({ error: "Invalid or expired reset code" });
    }

    console.log("User found, hashing new password...");
    user.password = newPassword;
    user.resetCode = null;
    user.resetCodeExpires = null;

    console.log("Saving updated user...");
    await user.save();

    console.log("Password reset successful");
    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Error in handleResetPassword:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleStatus = (req, res) => {
  res.status(200).json({ user: req.user });
};

const handleGetCurrentUserProfile = async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        picture: req.user.picture,
        authProvider: req.user.authProvider,
      },
    });
  } catch (error) {
    console.error("Error in /api/me:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  handleLogin,
  handleSignup,
  handleLogout,
  handleForgotPassword,
  handleVerifyResetCode,
  handleResetPassword,
  handleStatus,
  handleGetCurrentUserProfile,
};

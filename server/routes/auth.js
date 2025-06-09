//auth.js route
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const crypto = require("crypto");

// Generate JWT token helper
const generateToken = (user, userAgent) => {
  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      userAgent,
      deviceId: user.deviceId
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

router.get("/google", 
  passport.authenticate("google", { 
    scope: ["profile", "email"],
    prompt: 'select_account' // This forces Google to show account selection screen
  })
);

router.get("/google/callback",
  passport.authenticate("google", { 
    session: false,
    failureRedirect: "http://localhost:3000/login?error=google_failed"
  }),
  async (req, res) => {
    try {
      const userAgent = req.headers["user-agent"];
      const deviceId = crypto.randomBytes(16).toString("hex");
      
      // Update user with device ID
      req.user.deviceId = deviceId;
      await req.user.save();

      const token = generateToken(req.user, userAgent);
      res.redirect(`http://localhost:3000/auth/success?token=${token}`);
    } catch (error) {
      console.error('Token generation error:', error);
      res.redirect("http://localhost:3000/login?error=token_failed");
    }
  }
);

module.exports = router;

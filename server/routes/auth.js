//auth.js route
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Generate JWT token helper
const generateToken = (user) => {
  const payload = {
    userId: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    picture: user.picture,
    authProvider: user.authProvider
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
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
  (req, res) => {
    try {
      const token = generateToken(req.user);
      res.redirect(`http://localhost:3000/auth/success?token=${token}`);
    } catch (error) {
      console.error('Token generation error:', error);
      res.redirect("http://localhost:3000/login?error=token_failed");
    }
  }
);

module.exports = router;

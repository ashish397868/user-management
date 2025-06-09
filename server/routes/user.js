const {Router}=require('express')
const {authMiddleware} = require('../middleware/auth');
const userRouter=Router();
const {
  handleLogin,
  handleSignup,
  handleLogout,
  handleForgotPassword,
  handleVerifyResetCode,
  handleResetPassword
} = require('../controllers/userController');

userRouter.post('/signup',handleSignup);
userRouter.post('/login',handleLogin);
userRouter.post('/logout',handleLogout);
userRouter.post('/forgot-password', handleForgotPassword);
userRouter.post('/verify-reset-code', handleVerifyResetCode);
userRouter.post('/reset-password', handleResetPassword);

// New endpoint to check authentication status
userRouter.get('/auth-status', authMiddleware, (req, res) => {
  res.status(200).json({ user: req.user });
});

// @route GET /api/me
// @desc Get current user profile
// @access Private
userRouter.get('/api/me', authMiddleware, async (req, res) => {
  try {
    // req.user is already populated by auth middleware
    res.json({ 
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        picture: req.user.picture,
        authProvider: req.user.authProvider
      }
    });
  } catch (error) {
    console.error('Error in /api/me:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports=userRouter;
const { Router } = require('express');
const { authMiddleware } = require('../middleware/auth');
const userRouter = Router();
const {
  handleLogin,
  handleSignup,
  handleLogout,
  handleForgotPassword,
  handleVerifyResetCode,
  handleResetPassword,
  handleStatus,
  handleGetCurrentUserProfile
} = require('../controllers/userController');

// Auth routes
userRouter.post('/signup', handleSignup);
userRouter.post('/login', handleLogin);
userRouter.post('/logout', handleLogout);

// Password reset routes
userRouter.post('/forgot-password', handleForgotPassword);
userRouter.post('/verify-reset-code', handleVerifyResetCode);
userRouter.post('/reset-password', handleResetPassword);

// Protected routes
userRouter.get('/auth-status', authMiddleware, handleStatus);
userRouter.get('/api/me', authMiddleware, handleGetCurrentUserProfile);

module.exports = userRouter;
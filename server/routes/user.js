const {Router}=require('express')
const {authMiddleware} = require('../middleware/auth');
const userRouter=Router();
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

userRouter.post('/signup',handleSignup);
userRouter.post('/login',handleLogin);
userRouter.post('/logout',handleLogout);
userRouter.post('/forgot-password', handleForgotPassword);
userRouter.post('/verify-reset-code', handleVerifyResetCode);
userRouter.post('/reset-password', handleResetPassword);
userRouter.get('/auth-status', authMiddleware,handleStatus );//endpoint to check authentication status
userRouter.get('/api/me', authMiddleware, handleGetCurrentUserProfile);//Get current user profile

module.exports=userRouter;
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

module.exports=userRouter;
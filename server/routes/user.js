const {Router}=require('express')
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

module.exports=userRouter;
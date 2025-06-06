const {Router}=require('express');
const {authMiddleware, isAdmin} = require('../middleware/auth');

const AdminRouter= Router();

AdminRouter.get('/dashboard', authMiddleware, isAdmin, (req, res) => {
    res.status(200).json({ message: "Welcome to the admin dashboard", user: req.user });
})


module.exports = AdminRouter;
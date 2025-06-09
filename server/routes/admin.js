const {Router}=require('express');
const {authMiddleware, isAdmin} = require('../middleware/auth');
const User = require('../models/user');

const AdminRouter= Router();

AdminRouter.get('/dashboard', authMiddleware, isAdmin, (req, res) => {
    res.status(200).json({ message: "Welcome to the admin dashboard", user: req.user });
})

AdminRouter.get('/stats', authMiddleware, isAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ lastLogin: { $gte: new Date(Date.now() - 24*60*60*1000) }}); // Active in last 24h
    const newUsers = await User.countDocuments({ 
      createdAt: { $gte: new Date(new Date().setHours(0,0,0,0)) }
    });

    res.json({
      totalUsers,
      activeUsers,
      newUsers
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = AdminRouter;
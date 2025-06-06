const {Router}=require('express');
const {authMiddleware} = require('../middleware/auth');

const protectedRouter= Router();

protectedRouter.get('/', authMiddleware ,(req, res) => {
    res.status(200).json({ message: "Welcome to the Website", user: req.user });
})

module.exports = protectedRouter;
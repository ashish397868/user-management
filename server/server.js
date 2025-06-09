//server.js
dotenv = require('dotenv').config();// Load environment variables
const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin'); 
const home = require('./routes/home'); 
const passport = require('passport');

// Passport config
require('./config/passport')(passport);

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Routes
app.use('/', userRouter);  // This will handle /api/me
app.use('/admin', adminRouter);
app.use('/home', home);
app.use('/auth', require('./routes/auth'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
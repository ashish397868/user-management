const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin'); 
const home = require('./routes/home'); 

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

connectDB();


app.use('/',userRouter);
app.use('/admin',adminRouter);
app.use('/home', home);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
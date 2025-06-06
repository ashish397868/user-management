const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendResetCode = async (email, resetCode) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Code',
            html: `
                <h1>Password Reset Request</h1>
                <p>Your password reset code is: <strong>${resetCode}</strong></p>
                <p>This code will expire in 10 minutes.</p>
                <p>If you did not request this reset, please ignore this email.</p>
            `
        });
        return true;
    } catch (error) {
        console.error('Email sending failed:', error);
        return false;
    }
};

module.exports = {
    sendResetCode
};

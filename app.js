const express = require('express');
const mongoose = require('mongoose');
const formRouter = require('./router/formRouter');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();
const PORT =  3001;

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect('mongodb+srv://dhruvrajput9560:Dhruv123@airbnb.u9j8ctf.mongodb.net/formdata')
.then(() => console.log('database connected'))
.catch((err) => console.log(err));

// Routes
app.use('/forms', formRouter);

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'Backend is working!',
        timestamp: new Date().toISOString(),
        cors: 'enabled'
    });
});

// Email sending endpoint (commented out)
// app.post('/send-email', (req, res) => {
//     const { subject, recipient } = req.body;
//     
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'dhruvrajput9560@gmail.com',
//             pass: 'abcd-efgh-ijkl-mnop' // Replace with your actual Gmail App Password
//         }
//     });
//     
//     const mailOptions = {
//         from: 'dhruvrajput9560@gmail.com',
//         to: recipient,
//         subject: subject,
//         text: 'Hello world!'
//     };
//     
//     transporter.sendMail(mailOptions, function(error, info){
//         if (error) {
//             console.log(error);
//             res.status(500).json({ message: 'Email sending failed', error: error.message });
//         } else {
//             console.log('Email sent: ' + info.response);
//             res.json({ message: 'Email sent successfully', info: info.response });
//         }
//     });
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');
const formRouter = require('./router/formRouter');
const cors = require('cors');
const app = express();
const PORT =  5000;

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

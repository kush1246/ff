const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.log('MongoDB connection error:', err));

// Import routes
const authRoutes = require('./routes/auth');

// Use routes
app.use('/api', authRoutes);

// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Student Authentication API is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

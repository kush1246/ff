const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['https://student-auth-frontend.onrender.com', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB with retry logic
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.log('MongoDB connection error:', error);
    // Retry connection after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

connectDB();

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

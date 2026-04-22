const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const router = express.Router();

// Authentication middleware
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const student = await Student.findById(decoded.id).select('-password');
        
        if (!student) {
            return res.status(401).json({ message: 'Invalid token.' });
        }

        req.student = student;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};

// POST /api/register - Register a new student
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, course } = req.body;

        // Validation
        if (!name || !email || !password || !course) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if student already exists
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new student
        const student = new Student({
            name,
            email,
            password: hashedPassword,
            course
        });

        await student.save();

        // Generate JWT token
        const token = jwt.sign(
            { id: student._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'Student registered successfully',
            token,
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                course: student.course
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// POST /api/login - Authenticate student and return JWT token
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find student
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: student._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            message: 'Login successful',
            token,
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                course: student.course
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// PUT /api/update-password - Update password (verify old password)
router.put('/update-password', authMiddleware, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        // Validation
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Current password and new password are required' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'New password must be at least 6 characters long' });
        }

        // Get student with password
        const student = await Student.findById(req.student.id);
        
        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, student.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        // Update password
        await Student.findByIdAndUpdate(req.student.id, {
            password: hashedNewPassword
        });

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Password update error:', error);
        res.status(500).json({ message: 'Server error during password update' });
    }
});

// PUT /api/update-course - Change course
router.put('/update-course', authMiddleware, async (req, res) => {
    try {
        const { course } = req.body;

        // Validation
        if (!course) {
            return res.status(400).json({ message: 'Course is required' });
        }

        // Update course
        await Student.findByIdAndUpdate(req.student.id, { course });

        res.json({ message: 'Course updated successfully' });
    } catch (error) {
        console.error('Course update error:', error);
        res.status(500).json({ message: 'Server error during course update' });
    }
});

// GET /api/student - Get student details (protected route)
router.get('/student', authMiddleware, async (req, res) => {
    try {
        res.json({
            student: {
                id: req.student._id,
                name: req.student.name,
                email: req.student.email,
                course: req.student.course
            }
        });
    } catch (error) {
        console.error('Get student error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

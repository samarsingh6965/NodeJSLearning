const express = require('express');
const router = express.Router();
const User = require('../Model/UserModel'); // Import the User model
const bcrypt = require('bcrypt');
const generateToken = require('../JWT/index');

// Get all users
router.get('/getusers', async (req, res, next) => {
    try {
        const users = await User.find({});
        res.status(200).json({ users: "All Users list", users });
    } catch (error) {
        console.error('Error occurred:', error);
        next(error); // Pass the error to the default error handler
    }
});

// Create users
router.post('/register', async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        const savedUser = await newUser.save();
        return res.status(200).json({ message: 'User Created', savedUser });
    } catch (error) {
        next(error); // Pass the error to the default error handler
    }
});

// login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        // If user not found or password doesn't match, return error response
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user);
        // If login is successful, return success response
        return res.status(200).json({ message: 'Login successful',token:token, user });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

// Update user by userId
router.put('/users/:userId', async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const { username, email, password } = req.body;

        // Find the user by userId
        const user = await User.findByIdAndUpdate(userId, { username, email, password }, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User updated', user });
    } catch (error) {
        next(error); // Pass the error to the default error handler
    }
});

// Delete user by userId
router.delete('/users/:userId', async (req, res, next) => {
    try {
        const userId = req.params.userId;

        // Find the user by userId and delete it
        const deletedUser = await User.findByIdAndRemove(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User deleted', deletedUser });
    } catch (error) {
        next(error); // Pass the error to the default error handler
    }
});

module.exports = router;

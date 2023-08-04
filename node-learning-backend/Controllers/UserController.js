const express = require('express');
const router = express.Router();
const User = require('../Model/UserModel'); // Import the User model
const bcrypt = require('bcrypt');
const generateToken = require('../JWT/index');
const ServerResponseHandler = require('../ServerResponse/ServerResponse');
const response = new ServerResponseHandler();

// Get all users
router.get('/getusers', async (req, res) => {
    try {
        const users = await User.find({});
        return response.handleSuccess(res, 'Users fetched Successfully', users);
    } catch (error) {
        return response.somethingWentWrong(res,)
    }
});

// Create users
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            response.badRequest(res, 'Email Already Exist');
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, email, password: hashedPassword });
            const savedUser = await newUser.save();
            response.handleSuccess(res, 'Registered Successfully', savedUser)
        }
    } catch (error) {
        response.somethingWentWrong(res);
    }
});

// login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            response.unAuthorized(res, 'Invalid Email.');
        } else {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                response.unAuthorized(res, 'Invalid Password.');
            } else {
                const token = generateToken(user);
                response.handleSuccess(res, 'User LoggedIn Successfully', { user:{name:user?.username,id:user?._id,email:user?.email}, token: token });
            }
        }
    } catch (error) {
        response.somethingWentWrong(res);
    }
});

// // Update user by userId
// router.put('/users/:userId', async (req, res, next) => {
//     try {
//         const userId = req.params.userId;
//         const { username, email, password } = req.body;
//         const user = await User.findByIdAndUpdate(userId, { username, email, password }, { new: true });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         return res.status(200).json({ message: 'User updated', user });
//     } catch (error) {
//         next(error);
//     }
// });

// // Delete user by userId
// router.delete('/users/:userId', async (req, res, next) => {
//     try {
//         const userId = req.params.userId;

//         // Find the user by userId and delete it
//         const deletedUser = await User.findByIdAndRemove(userId);

//         if (!deletedUser) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         return res.status(200).json({ message: 'User deleted', deletedUser });
//     } catch (error) {
//         next(error); // Pass the error to the default error handler
//     }
// });

module.exports = router;

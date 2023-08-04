const User = require('../Model/UserModel'); // Import the User model
const bcrypt = require('bcrypt');
const {generateToken} = require('../JWT/index');
const ServerResponseHandler = require('../ServerResponse/ServerResponse');
const response = new ServerResponseHandler();

// Get all users


// Create users


// login user

module.exports = {
    getUser : async (req, res) => {
        try {
            const users = await User.find({});
            return response.handleSuccess(res, 'Users fetched Successfully', users);
        } catch (error) {
            return response.somethingWentWrong(res)
        }
    },
    register :  async (req, res) => {
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
    },

    login :  async (req, res) => {
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
    }

};

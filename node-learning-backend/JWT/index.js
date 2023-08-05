const jwt = require('jsonwebtoken');
const ServerResponseHandler = require("../ServerResponse/ServerResponse");
const response = new ServerResponseHandler();
const generateToken = (user) => {
    const payload = {
        userId: user._id,
        username: user.username,
        email: user.email,
    };
    const options = {
        expiresIn: '1h', // Token expiration time (optional)
    };
    return jwt.sign(payload, 'your_secret_key', options);
};
const verifyToken = (req, res, next) => {
    const token = req.header('token');
    // console.log(token)
    if (!token) {
        response.unAuthorized(res, 'Access denied. Token is missing.');
    }
    try {
        const decoded = jwt.verify(token, 'your_secret_key'); // Replace with your secret key
        req.user = decoded;
        next();
    } catch (error) {
        response.unAuthorized(res, 'Access denied. Invalid token.');
    }
};
module.exports = {
    generateToken,
    verifyToken
}
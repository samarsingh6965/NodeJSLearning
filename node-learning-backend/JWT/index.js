const jwt = require('jsonwebtoken');
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

module.exports = generateToken;
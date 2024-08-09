// utils/jwt.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config()

/**
 * Generates a JWT token.
 * @param {Object} user - The user object containing the user's ID and role.
 * @param {Function} callback - A callback function to handle the response.
 */
const generateToken = (user, callback) => {
    // Payload
    console.log("User: ", user)
    const payload = {
        user: {
            id: user.id,
            role: user.role
        }
    };

    // JWT Sign IN
    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h'},
        (err, token) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, token);
        }
    );
};

module.exports = generateToken;
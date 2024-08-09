const User = require('../models/User');
const generateToken = require('../utils/jwt');
const bcrypt = require('bcryptjs');

// @desc Register user
exports.registerUser = async (req, res) => {
    // Recieve the data from the request body
    const { username, email, password, role} = req.body
    console.log(username,email,password);
    
    try {
        // Check if the email exist.
        let  user = await User.findOne({ email });
        if (user) {
            // Respond with an error message back to the client saying that User already exist
            return res.status(400).json({msg: 'User already exists'});
        }
        
        // Create a new user
        user = User({
            username,
            email,
            password,
            role
        });

        // Save the USER
        await user.save();

        // Generate token function
        generateToken(user, (err, token) => {
            if (err) {
                return res.status(500).json({ error: "Token generation failed"});
            }
            // Respond with the token if all goes well
            res.json({ token });
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

// @desc Login USER
exports.loginUser = async (req, res) => {
    // Get the data from the request body
    const { email, password } = req.body;

    try {
        // Check if the USER exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Crendentials' });
        }

        // Compare the entered password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        // Check if the password match with the USER password
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials'});
        }

        // Generate token function
        generateToken(user, (err, token) => {
            if (err) {
                return res.status(500).json({ error: "Token generation failed"});
            }
            // Respond with the token if all goes well
            res.json({ token });
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error')
    }
};

// @desc Get authenticated user
exports.getUser = async (req, res) => {
    try {
        // Get user by their password.
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
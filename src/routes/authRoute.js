const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// @route  POST api/auth/signup
// @desc Register user
router.post('/signup', registerUser);

// @route  POST  api/auth/login
// @desc  Login user
router.post('/login', loginUser);

// @route  GET api/auth/user
// @desc   GET logged in user
router.get('/user', authMiddleware, getUser);

module.exports = router;
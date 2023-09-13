// routes/signupRoute.js
const express = require('express');
const signUpController = require('../controller/signupController');

const router = express.Router();

// Sign-up route
// router.post('/signup', signUpController.signUp);
router.post('/signup/user', signUpController.userSignUp)
module.exports = router;
// routes/signupRoute.js
const express = require('express');
const signUpController = require('../controller/signupController');

const router = express.Router();

// Sign-up route
// router.post('/signup', signUpController.signUp);
router.post('/test', signUpController.test)
module.exports = router;
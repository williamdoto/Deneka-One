// signInRoute.js
const express = require('express');
const router = express.Router();
const { signIn, generateOtp, verifyOtp } = require('../controller/signinController');

router.post('/signin', signIn);

router.post('/verify-otp', verifyOtp);
router.post('/send-otp', generateOtp);

module.exports = router;

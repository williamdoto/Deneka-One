const express = require('express');
const router = express.Router();
const { createInquiry } = require('../controller/inquiryController'); 

// POST route for creating an inquiry
console.log(createInquiry);
// router.post('/create-inquiry', createInquiry);
router.post('/create-inquiry', (req, res) => {
    console.log('Route hit, body:', req.body);
    res.send('Inquiry route is working');
  });
  


module.exports = router;
console.log('inquiry route loaded');

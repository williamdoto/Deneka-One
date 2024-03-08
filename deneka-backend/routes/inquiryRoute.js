const express = require('express');
const router = express.Router();
const { createInquiry } = require('../controller/inquiryController'); 
const { deleteInquiry } = require('../controller/inquiryController');
// POST route for creating an inquiry

router.post('/create-inquiry', createInquiry);
router.delete('/delete-inquiry/:inqId', deleteInquiry);
// router.post('/create-inquiry', (req, res) => {
//     console.log('Route hit, body:', req.body);
//     res.send('Inquiry route is working');
//   });
  


module.exports = router;
console.log('inquiry route loaded');

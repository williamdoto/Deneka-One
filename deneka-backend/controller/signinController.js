// for signup page
// controllers/signinController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const {connectionPool, connectionOptions} = require('../config/snowflake.js'); 
const snowflake = require('snowflake-sdk');


// In-memory storage for OTPs
const otpStorage = {};

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com.au',
  port: 465,
  secure: true,
  auth: {
    user: 'oldphonedeals.group05@zohomail.com.au',
    pass: 'LypNzg79mqvb'
  }
});

// Sign-in route handler
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database

    // if (!user) {
    //   return res.status(401).json({ error: 'Invalid credentials' });
    // }

    // // Compare the provided password with the hashed password
    // const isPasswordMatch = await bcrypt.compare(password, user.password);
    // if (!isPasswordMatch) {
    //   return res.status(401).json({ error: 'Invalid credentials' });
    // }

    // // Generate a JWT token
    // const token = jwt.sign({ userId: user.email }, 'Justins-secret-key', {
    //   expiresIn: '24h',
    // });
    res.json({success:true})

    // Send the token in the response
    // res.json({ success: true, token });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


const generateOtp = async (req, res) => {
  try {
    console.log("generateOtp called with request body:", req.body);
    const { email } = req.body;

    const connection = snowflake.createConnection(connectionOptions);

    connection.connect((err, conn) => {
      if (err) {
        console.error('Unable to connect:', err);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
      }

      const query = `SELECT COUNT(*) as count FROM USER WHERE UPPER(EMAIL) = UPPER('${email}')`;
      conn.execute({
        sqlText: query,
        complete: (err, stmt, rows) => {
          if (err) {
            console.error(`Failed to execute statement due to the following error: ${err}`);
            return res.status(500).json({ success: false, message: 'Internal Server Error' });
          }

          console.log(`Email count from database for ${email}: ${rows[0].count}`);
          console.log("Returned rows:", rows);

          if (!rows[0] || rows[0].COUNT === 0) {
            return res.status(400).json({ success: false, message: 'Email not registered' });
          }

          const otp = Math.floor(1000 + Math.random() * 9000);

          const mailOptions = {
            from: '"OldPhoneDeals" <oldphonedeals.group05@zohomail.com.au>',
            to: email,
            subject: 'One Time Password',
            text: `Your One Time Password is: ${otp}`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
              return res.status(500).json({ success: false, message: 'Failed to send OTP' });
            }

            otpStorage[email] = {
              otp,
              timestamp: Date.now(),
            };

            res.json({ success: true, message: 'OTP sent to email' });
          });
        }
      });
    });
  } catch (error) {
    console.error('Error generating OTP:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


// Verify OTP
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    // Retrieve stored OTP for the email
    const storedOtpInfo = otpStorage[email];
    
    console.log('Stored OTP:', storedOtpInfo.otp, 'Type:', typeof storedOtpInfo.otp);
    console.log('Received OTP:', otp, 'Type:', typeof otp);

    // Compare provided OTP with stored OTP
    if (!storedOtpInfo || storedOtpInfo.otp !== Number(otp)) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
    
    
    // Check for OTP expiration (e.g., 5 minutes)
    const isOtpExpired = Date.now() - storedOtpInfo.timestamp > 5 * 60 * 1000;
    if (isOtpExpired) {
      return res.status(400).json({ success: false, message: 'OTP has expired' });
    }
    
    // If OTP is valid, proceed with next steps
    // [Your logic after OTP verification, e.g., sending a JWT, creating a session, etc.]
    
    // Clear the OTP from storage
    delete otpStorage[email];
    
    res.json({ success: true, message: 'OTP verified' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = { signIn, generateOtp, verifyOtp };
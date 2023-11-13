// for signup page
// controllers/signinController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const {connectionPool, connectionOptions} = require('../config/snowflake.js'); 
const snowflake = require('snowflake-sdk');
const speakeasy = require('speakeasy');

// In-memory storage for OTPs
const otpStorage = {};

async function findUserByEmail(email) {
  // Create a new connection to the Snowflake database
  const connection = snowflake.createConnection(connectionOptions);

  if (!email) {
    throw new Error("Email is undefined in findUserByEmail");
  }

  return new Promise((resolve, reject) => {
    connection.connect((err, conn) => {
      if (err) {
        console.error('Unable to connect to Snowflake:', err);
        return reject(err);
      }

      // Log the email being used to find the user
      console.log("Looking up user with email:", email.toLowerCase());

      const query = `SELECT ID, FIRST_NAME, LAST_NAME, EMAIL, PASSWORD_HASH, TOTP_SECRET FROM DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.USER WHERE LOWER(EMAIL) = LOWER(?)`;

      conn.execute({
        sqlText: query,
        binds: [email.toLowerCase()], // Email is already expected to be in the correct case
        complete: (err, stmt, rows) => {
          if (err) {
            console.error('Failed to execute query:', err);
            return reject(err);
          }
          console.log("Query executed, number of rows found:", rows.length);
          if (rows.length > 0) {
            const user = rows[0];
            resolve({
              id: user.ID,
              firstName: user.FIRST_NAME,
              lastName: user.LAST_NAME,
              email: user.EMAIL,
              passwordHash: user.PASSWORD_HASH,
              totpSecret: user.TOTP_SECRET
            });
          } else {
            resolve(null);
          }
        }
      });
    });
  });
}

async function storeTotpSecret(email, secret) {
  const connection = snowflake.createConnection(connectionOptions);

  if (!email || !secret) {
    throw new Error("Email or secret is undefined in storeTotpSecret");
  }

  return new Promise((resolve, reject) => {
    connection.connect((err, conn) => {
      if (err) {
        console.error('Unable to connect to Snowflake:', err);
        return reject(err);
      }

      const query = `UPDATE DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.USER SET TOTP_SECRET = ? WHERE LOWER(EMAIL) = LOWER(?)`;

      conn.execute({
        sqlText: query,
        binds: [secret, email],
        complete: (err, stmt, rows) => {
          if (err) {
            console.error('Failed to execute query:', err);
            return reject(err);
          }
          console.log("TOTP Secret updated for user:", email);
          resolve();
        }
      });
    });
  });
}


async function setupTotp(req, res) {
  const { email } = req.body; // Ensure email is being passed correctly
  console.log("Email in setupTotp:", email);
  // Generate a TOTP secret
  const secret = speakeasy.generateSecret({ length: 20 });
  console.log("Secret in setupTotp:", secret.base32);

  try {
    // Store the secret in your database
    await storeTotpSecret(email, secret.base32);

    // Generate a QR code for scanning
    const qrCodeUrl = await generateQrCode(secret.base32);

    // Send back the QR code URL
    res.json({ secret: secret.base32, qrCodeUrl });
  } catch (error) {
    console.error('Error setting up TOTP:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}


async function generateQrCode(secret) {
  const qrcode = require('qrcode');

  const otpauthUrl = speakeasy.otpauthURL({
    secret: secret,
    label: 'DenekaIT', // Replace with your app's name
    issuer: 'DenekaIT', // Replace with your company's name
  });

  return new Promise((resolve, reject) => {
    qrcode.toDataURL(otpauthUrl, (err, dataUrl) => {
      if (err) {
        reject(err);
      } else {
        resolve(dataUrl);
      }
    });
  });
}


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
    const user = await findUserByEmail(email);
    console.log(user);
    if (!user) {
      console.log("Wrong user or email not found");
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    console.log("Retrieved hashed password:", user.passwordHash);
    // console.log(user.hashedpassword);
    // console.log(user.passwordHash);
    // console.log(password);

    // Compare the provided password with the hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordMatch) {
      console.log("Password does not match.");
      return res.status(401).json({ error: 'Password does not match.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret_key', {
      expiresIn: '24h',
    });

    // Send the token in the response
    res.json({ success: true, token, userId: user.id }); // Include the user ID in the response
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};



const generateOtp = async (req, res) => {
  try {
    console.log("generateOtp called with request body:", req.body);
    const { email } = req.body;

    // Ensure email is in lowercase
    const lowerCaseEmail = email.toLowerCase();

    // Generate OTP and store in otpStorage
    const otp = Math.floor(1000 + Math.random() * 9000);
    otpStorage[lowerCaseEmail] = {
      otp,
      timestamp: Date.now(),
    };

    console.log('Generated OTP for', lowerCaseEmail, ':', otp);

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


// Verify OTP function
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Ensure email is in lowercase
    const lowerCaseEmail = email.toLowerCase();

    // Retrieve stored OTP for the email
    const storedOtpInfo = otpStorage[lowerCaseEmail];

    console.log('Verifying OTP for', lowerCaseEmail, ':', otp, 'Stored OTP:', storedOtpInfo?.otp);
    // Check for OTP existence and validity
    if (!storedOtpInfo || storedOtpInfo.otp !== Number(otp)) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    // Check for OTP expiration (e.g., 5 minutes)
    const isOtpExpired = Date.now() - storedOtpInfo.timestamp > 5 * 60 * 1000;
    if (isOtpExpired) {
      delete otpStorage[lowerCaseEmail];
      return res.status(400).json({ success: false, message: 'OTP has expired' });
    }
    
    // Clear the OTP from storage
    delete otpStorage[lowerCaseEmail];

    // Generate a JWT token
    const token = jwt.sign({ userEmail: email }, 'Your-Secret-Key', {
      expiresIn: '24h',
    });

    res.json({ success: true, message: 'OTP verified', token });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

async function verifyTotp(req, res) {
  const { email, totpToken } = req.body;
  console.log('User email:', email); 
  console.log('User totpToken:', totpToken); 

  try {
    const user = await findUserByEmail(email);
    console.log('Retrieved user data in verifyTotp:', user); // Additional logging

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    console.log('User TOTP_SECRET in verifyTotp:', user.totpSecret); // Additional logging

    const tokenForVerification = speakeasy.totp({
      secret: user.totpSecret,
      encoding: 'base32'
    });
    
    console.log('Token for verification:', tokenForVerification);
    console.log('User TOTP_SECRET in verifyTotp:', user.totpSecret);
    console.log('User token:', totpToken);
    
    const isVerified = speakeasy.totp.verify({
      secret: user.totpSecret,
      encoding: 'base32',
      token: totpToken,
      window: 2
    });
    
    console.log('Verification result:', isVerified);
    

    console.log('User TOTP_SECRET:', user.totpSecret);
    console.log('User token:', totpToken); 
    console.log('Verification result:', isVerified); 

    if (isVerified) {
      // TOTP token is valid
      res.json({ success: true, message: 'TOTP verified' });
    } else {
      // TOTP token is invalid
      res.status(400).json({ success: false, message: 'Invalid TOTP' });
    }
  } catch (error) {
    console.error('Error verifying TOTP:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

module.exports = { signIn, generateOtp, verifyOtp, setupTotp, generateQrCode, verifyTotp};
// const bcrypt = require('bcrypt');
// const uuid = require('uuid');
// const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');
// const connectionPool = require('../config/snowflake');


// // Create a Nodemailer transporter
// const transporter = nodemailer.createTransport({
//   host: 'smtp.zoho.com.au',
//   port: 465,
//   secure: true, // use SSL
//   auth: {
//       user: 'oldphonedeals.group05@zohomail.com.au',
//       pass: 'LypNzg79mqvb'
//   }
// });

// // Send User Verification Code
// async function sendCode(email) {
//   console.log("SENDING VERIFICATION CODE\n\n\n");
//   console.log(email);

//   // Generate a unique verification token
//   const verificationCode = Math.floor(1000 + Math.random() * 9000);
//   console.log(verificationCode);

//   // Send the verification email with the verificationToken
//   const mailOptions = {
//     from: '"OldPhoneDeals" <oldphonedeals.group05@zohomail.com.au>',
//     to: email,
//     subject: 'Email Verification',
//     text: `Please enter the following 4-digit code in the browser to verify your email: ${verificationCode}`,
//   };
//   try {
//     await transporter.sendMail(mailOptions);
//   } catch (error) {
//       console.error("Error sending verification code:", error);
//   }

//     // set code in user
// }

// async function verify(req, res) {
//   console.log("VERIFYING USER\n\n\n");
  
//   const { email, code } = req.body;
//   console.log(email);
//   console.log(code);
  
//   try {
//     // Find the user with the matching verification token
//     // const user = await User.verifyUserToken(email, code);
//     // if (!user) {
//     //   return res.status(400).json({ error: 'Invalid verification token' });
//     // }

//     res.json({ success: "You have been verified." });
//   } catch (error) {
//       console.error('Error verifying email:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// }

// const getRecentAddedUser = async (res) => {
//   connectionPool.use(async (clientConnection) =>
//   {
//     try {

//         const getUser = `SELECT ID
//                           FROM DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.USER
//                           ORDER BY ID DESC
//                           LIMIT 1;`
          
//         const statement = await clientConnection.execute({
//             sqlText: getUser,
//             complete: function (err, stmt, rows)

//             {
//                 var stream = stmt.streamRows();
//                 // console.log(stream);

//                 stream.on('data', function (row)
//                 {
//                     console.log(row);
//                     // return row.ID;

//                     const token = jwt.sign(row.ID, '12345678');
//                     console.log("JWT token: "+ token);

//                     res.cookie('token', token, {
//                       httpOnly: true,
//                       path: '/',
//                     });

//                     res.json({message: "User signed up successfully"})

//                 });
//                 stream.on('end', async (row) =>
//                 {
//                     console.log('Success! All rows consumed');
//                     // return row.id;
//                     // return row.ID;
//                     // await sendCode(email);
                    
//                 });
//             }
//         });

//     } catch (error) {

//         console.error('Error inserting data:', error);
//     }
//   });
// }

// const userSignUp = async (req, res) => {
//   console.log("Signing up for USER!")

//   const { name, companyName, email, location} = req.body;
//   // Use the connection pool and execute a statement
//   console.log(name, companyName, email, location);
  

//   // await sendCode(email);

//   connectionPool.use(async (clientConnection) =>
//   {
//     console.log("HERE")
//     try {
//         const insertUser = `
//           INSERT INTO DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.USER
//             (FIRST_NAME, LAST_NAME, EMAIL, PASSWORD_SALT, PASSWORD_HASH, PHONE_NUMBER, ISVERIFIED, VERIFICATIONTOKEN, RESETPASSWORDTOKEN)
//           VALUES
//             (?, ?, ?, ?, ?, ?, ?, ?, ?);
//         `;

//         // const combinedQuery = insertUser + ' ' + getUser;
//         // console.log(combinedQuery);
    
//         const binds = [name, companyName, email, 'somesaltvalue', 'hashedpassword', '123-456-7890', false, 'verificationtoken', 'resetpasswordtoken'];

//         const statement = await clientConnection.execute({
//             sqlText: insertUser,
//             binds: binds,
//             complete: function (err, stmt, rows)
//             {
//                 // console.log(rows);
//                 // console.log(stmt);
//                 // console.log(stmt.getSqlText());
//                 // console.log(stmt.fetchRows());
//                 var stream = stmt.streamRows();
//                 console.log(stream);
//                 // console.log(stmt.getSqlText());
//                 // console.log(stmt.getColumns());
//                 // console.log(stmt.getColumn());

//                 stream.on('data', function (row)
//                 {
//                     console.log(row);
                    

                    
//                 });
//                 stream.on('end', async (row) =>
//                 {
//                     console.log('Success! All rows consumed');
//                     // await sendCode(email);
//                     getRecentAddedUser(res);

//                     // const user_id = await getRecentAddedUser();
//                     // console.log(user_id)
//                     // const token = jwt.sign(user_id, '12345678');
//                     // console.log("JWT token: "+ token);

//                     // res.cookie('token', token, {
//                     //   httpOnly: true,
//                     //   path: '/',
//                     //   sameSite: 'strict', // or 'lax'
//                     // });

//                 });
//             }
//         });
//     } catch (error) {
//         console.error('Error inserting data:', error);

//         res.json({message: "User signed up failed"})

//     }    
      
//   });

//     // Send verification code via email after signing up
//     await sendCode(email);

//   // password hash
//   // const passwordSalt = crypto.generateSalt();

//   // const passwordHash = crypto.generateHash(password,passwordSalt);
//   // //console.log(passwordHash);

   
// }

// module.exports = { userSignUp };

const bcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const snowflake = require('snowflake-sdk');
const {connectionPool, connectionOptions} = require('../config/snowflake');

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com.au',
  port: 465,
  secure: true,
  auth: {
      user: 'oldphonedeals.group05@zohomail.com.au',
      pass: 'LypNzg79mqvb'
  }
});

async function sendCode(email) {
  console.log("SENDING VERIFICATION CODE\n\n\n");
  console.log(email);

  const verificationCode = Math.floor(1000 + Math.random() * 9000);
  console.log(verificationCode);

  const mailOptions = {
    from: '"OldPhoneDeals" <oldphonedeals.group05@zohomail.com.au>',
    to: email,
    subject: 'Email Verification',
    text: `Please enter the following 4-digit code in the browser to verify your email: ${verificationCode}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully!");
  } catch (error) {
    console.error("Error sending verification code:", error);
  }
}

async function verify(req, res) {
  console.log("VERIFYING USER\n\n\n");
  
  const { email, code } = req.body;
  console.log(email);
  console.log(code);
  
  try {
    // Your verification logic here...

    res.json({ success: "You have been verified." });
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const getRecentAddedUser = async (res) => {
  connectionPool.use(async (clientConnection) => {
    try {
        const getUser = `SELECT ID
                          FROM DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.USER
                          ORDER BY ID DESC
                          LIMIT 1;`
          
        const statement = await clientConnection.execute({
            sqlText: getUser,
            complete: function (err, stmt, rows) {
                var stream = stmt.streamRows();
                stream.on('data', function (row) {
                    console.log(row);
                    const token = jwt.sign(row.ID, '12345678');
                    console.log("JWT token: "+ token);

                    res.cookie('token', token, {
                      httpOnly: true,
                      path: '/',
                    });

                    res.json({message: "User signed up successfully"})
                });
                stream.on('end', async (row) => {
                    console.log('Success! All rows consumed');
                });
            }
        });
    } catch (error) {
        console.error('Error inserting data:', error);
    }
  });
}

const userSignUp = async (req, res) => {
  let connection = null;
  try {
    console.log("Signing up for USER!");

    const { name, companyName, email, location, password } = req.body;
    const ipAddress = req.ip; // Retrieving the IP Address
    console.log(name, companyName, email, location, password, ipAddress);

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Hashed Password:", hashedPassword);

    // Create a new connection using the Snowflake SDK
    connection = snowflake.createConnection(connectionOptions);

    // Attempt to connect to Snowflake
    await new Promise((resolve, reject) => {
      connection.connect((err, conn) => {
        if (err) {
          console.error('Unable to connect to Snowflake:', err);
          reject(err);
        }
        resolve(conn);
      });
    });

    // Define the SQL insert statement
    const insertUser = `
      INSERT INTO DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.USER
        (FIRST_NAME, LAST_NAME, EMAIL, PASSWORD_SALT, PASSWORD_HASH, PHONE_NUMBER, ISVERIFIED, VERIFICATIONTOKEN, RESETPASSWORDTOKEN, IP_ADDRESS)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const binds = [name, companyName, email, salt, hashedPassword, '123-456-7890', false, uuid.v4(), uuid.v4(), ipAddress];

    // Execute the insert statement
    await new Promise((resolve, reject) => {
      connection.execute({
        sqlText: insertUser,
        binds: binds,
        complete: (err, stmt, rows) => {
          if (err) {
            console.error('Failed to execute statement:', err);
            reject(err);
          }
          console.log('User created:', rows);
          resolve(rows);
        }
      });
    });

    // Send the verification code via email
    await sendCode(email);

    // Respond to the client indicating success
    res.json({ message: "User signed up successfully" });
  } catch (error) {
    console.error('Error during user signup:', error);
    res.status(500).json({ message: "User signup failed due to an error." });
  } finally {
    // Always close the connection whether the try block succeeds or not
    if (connection) {
      connection.destroy();
    }
  }
};





module.exports = { userSignUp, verify, sendCode, getRecentAddedUser };
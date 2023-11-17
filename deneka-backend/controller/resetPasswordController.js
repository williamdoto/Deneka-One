const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const snowflake = require('snowflake-sdk');
const { connectionOptions } = require('../config/snowflake');
const nodemailer = require('nodemailer');

const requestReset = async (req, res) => {
  const { email } = req.body;
  try {
    const connection = snowflake.createConnection(connectionOptions);

    connection.connect((err, conn) => {
      if (err) {
        console.error('Unable to connect to Snowflake:', err);
        return res.status(500).json({ success: false, message: 'Unable to connect to database' });
      }

      const query = `SELECT * FROM USER WHERE EMAIL = LOWER(?)`;
      conn.execute({
        sqlText: query,
        binds: [email.toLowerCase()],
        complete: (err, stmt, rows) => {
          if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ success: false, message: 'Error executing query' });
          }

          if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found or not verified' });
          }

          const resetToken = uuidv4();
          const updateQuery = `UPDATE USER SET RESETPASSWORDTOKEN = ? WHERE EMAIL = ?`;
          conn.execute({
            sqlText: updateQuery,
            binds: [resetToken, email.toLowerCase()],
            complete: (err, stmt, rows) => {
              if (err) {
                console.error('Error executing update query:', err);
                return res.status(500).json({ success: false, message: 'Error executing update query' });
              }

              const transporter = nodemailer.createTransport({
                host: 'smtp.zoho.com.au',
                port: 465,
                secure: true,
                auth: {
                  user: 'oldphonedeals.group05@zohomail.com.au',
                  pass: 'LypNzg79mqvb'
                }
              });

              const mailOptions = {
                from: '"OldPhoneDeals" <oldphonedeals.group05@zohomail.com.au>',
                to: email,
                subject: 'Password Reset',
                text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\nhttp://localhost:3000/PasswordResetPage/${resetToken}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
              };

              transporter.sendMail(mailOptions, (emailErr, info) => {
                if (emailErr) {
                  console.error('Error sending email', emailErr);
                  return res.status(500).json({ success: false, message: 'Error sending email' });
                }
                res.json({ success: true, message: 'Reset link sent to email' });
              });

              connection.destroy();
            }
          });
        }
      });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const verifyResetToken = async (req, res) => {
  const { token } = req.params; // assuming token is sent as a URL parameter
  try {
    const user = await User.findOne({ resetPasswordToken: token });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Invalid or expired reset token' });
    }
    res.json({ success: true, message: 'Token is valid', userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const connection = snowflake.createConnection(connectionOptions);
    
    connection.connect((err, conn) => {
      if (err) {
        console.error('Unable to connect to Snowflake:', err);
        return res.status(500).json({ success: false, message: 'Unable to connect to database' });
      }

      const query = `SELECT * FROM USER WHERE RESETPASSWORDTOKEN = ?`;
      conn.execute({
        sqlText: query,
        binds: [token],
        complete: (err, stmt, rows) => {
          if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ success: false, message: 'Error executing query' });
          }

          if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Invalid or expired reset token' });
          }

          // Hash the new password
          bcrypt.genSalt(10, (saltErr, salt) => {
            if (saltErr) {
              console.error('Error generating salt:', saltErr);
              return res.status(500).json({ success: false, message: 'Error generating salt' });
            }
            
            bcrypt.hash(newPassword, salt, (hashErr, hashedPassword) => {
              if (hashErr) {
                console.error('Error hashing password:', hashErr);
                return res.status(500).json({ success: false, message: 'Error hashing password' });
              }

              // Update user's password
              const updateQuery = `UPDATE USER SET PASSWORD_HASH = ?, RESETPASSWORDTOKEN = NULL WHERE RESETPASSWORDTOKEN = ?`;
              conn.execute({
                sqlText: updateQuery,
                binds: [hashedPassword, token],
                complete: (updateErr, stmt, rows) => {
                  if (updateErr) {
                    console.error('Error executing update query:', updateErr);
                    return res.status(500).json({ success: false, message: 'Error updating password' });
                  }

                  res.json({ success: true, message: 'Password has been reset' });
                }
              });
            });
          });

          connection.destroy();
        }
      });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


module.exports = { requestReset, verifyResetToken, resetPassword };


// api/user/services/YourServiceName.js
const connectionPool = require('../../../../config/snowflake');

module.exports = {
    saveUserToSnowflake: async function (
      email,
      password_salt,
      password_hash,
      self_intro,
      create_time,
      isVerified,
      verificationToken,
      resetPasswordToken
    ) {
      try {
        await connectionPool.use(async (clientConnection) => {
          const statement = await clientConnection.execute({
            sqlText: 'INSERT INTO users (email, password_salt, password_hash, self_intro, create_time, isVerified, verificationToken, resetPasswordToken) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            binds: [email, password_salt, password_hash, self_intro, create_time, isVerified, verificationToken, resetPasswordToken],
            complete: function (err, stmt, rows) {
              if (err) {
                console.error('Error executing SQL statement:', err.message);
                throw err;
              }
  
              console.log('Inserted', rows, 'row(s)');
            }
          });
        });
      } catch (error) {
        console.error('Snowflake Connection Error:', error);
      }
    },
  };
  
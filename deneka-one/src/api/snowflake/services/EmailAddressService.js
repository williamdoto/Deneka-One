// api/email-addresses/services/EmailAddressService.js

module.exports = {
    async saveEmailAddressToSnowflake(
      company_id,
      email_address
    ) {
      try {
        const connectionPool = require('../../../../config/snowflake');
  
        await connectionPool.use(async (clientConnection) => {
          const statement = await clientConnection.execute({
            sqlText: 'INSERT INTO EmailAddresses (company_id, email_address) VALUES (?, ?)',
            binds: [company_id, email_address],
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
  
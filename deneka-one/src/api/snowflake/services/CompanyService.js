// api/company/services/CompanyService.js

module.exports = {
    async saveCompanyToSnowflake(
      company_name,
      abn,
      company_street,
      country,
      state,
      city,
      post_code
    ) {
      try {
        const connectionPool = require('../../../../config/snowflake');
  
        await connectionPool.use(async (clientConnection) => {
          const statement = await clientConnection.execute({
            sqlText: 'INSERT INTO Company (company_name, abn, company_street, country, state, city, post_code) VALUES (?, ?, ?, ?, ?, ?, ?)',
            binds: [company_name, abn, company_street, country, state, city, post_code],
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
  
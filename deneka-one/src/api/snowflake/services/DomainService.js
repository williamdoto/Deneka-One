// api/domain/services/DomainService.js

module.exports = {
    async saveDomainToSnowflake(
      company_id,
      existing_domains,
      bought_domains,
      total_domain_price
      // ... other fields
    ) {
      try {
        const connectionPool = require('../../../../config/snowflake');
  
        await connectionPool.use(async (clientConnection) => {
          const statement = await clientConnection.execute({
            sqlText: 'INSERT INTO Domain (company_id, existing_domains, bought_domains, total_domain_price) VALUES (?, ?, ?, ?)',
            binds: [company_id, existing_domains, bought_domains, total_domain_price],
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
  
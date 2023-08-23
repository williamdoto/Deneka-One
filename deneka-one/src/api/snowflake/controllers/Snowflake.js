// api/snowflake/controllers/SnowflakeController.js

// import connectionPool from '../../../../config/snowflake';
const connectionPool = require('../../../../config/snowflake');
console.log(connectionPool)


async function testSnowflakeConnection() {
  try {
    // Use the connection pool and execute a statement
    await connectionPool.use(async (clientConnection) => {
      const statement = await clientConnection.execute({
        sqlText: 'select 1;',
        complete: function (err, stmt, rows) {
          var stream = stmt.streamRows();
          stream.on('data', function (row) {
            console.log(row);
          });
          stream.on('end', function () {
            console.log('All rows consumed');
            clientConnection.release();
          });
        }
      });
    });
  } catch (error) {
    console.error('Snowflake Connection Error:', error);
  }
}

module.exports = testSnowflakeConnection;
//   export default testConnection;
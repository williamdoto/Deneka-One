const snowflake = require('snowflake-sdk');

// Create the connection pool instance
// Snowflake connection options
const connectionOptions = {
    account: 'mwnawwx-qhb49306',
    username: 'denekaone',
    password: 'Will@Deneka1',
    warehouse: 'COMPUTE_WH', // Optional: specify the warehouse
    database: 'DASHBOARD_TEST_DATABASE',   // Optional: specify the database
    schema: 'DASHBOARD_SIGNUP'        // Optional: specify the schema
};

// Snowflake pool options
const poolOptions = {
  max: 10,
  min: 0
};

// Create the Snowflake connection pool
const connectionPool = snowflake.createPool(connectionOptions, poolOptions);

module.exports = connectionPool;




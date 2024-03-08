const snowflake = require('snowflake-sdk');
const {connectionPool, connectionOptions} = require('../config/snowflake');

const createTicket = async (req, res) => {
    let connection = null;
    try {
      console.log("Trying connection");
      const { TIC_PRIORITY, TIC_NAME, CLIENT_ID, DENEKA_ID } = req.body;
  
      // Validation: Ensure required fields are provided
      if (!TIC_PRIORITY || !TIC_NAME || !CLIENT_ID||  !DENEKA_ID) {
        return res.status(400).json({ message: "Missing required fields." });
      }
  
      connection = snowflake.createConnection(connectionOptions);
      const TIC_STATUS = false;
  
      await new Promise((resolve, reject) => {
        connection.connect((err, conn) => {
          if (err) {
            console.error('Unable to connect to Snowflake:', err);
            reject(err);
          }
          resolve(conn);
        });
      });
  
      const query = `
        INSERT INTO DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.TICKETS
          (TIC_PRIORITY, TIC_STATUS, TIC_NAME, TICK_DATEISSUE, CLIENT_ID, DENEKA_ID)
        VALUES
          (?, ?, ?, CURRENT_TIMESTAMP(), ?, ?);
      `;
  
      await new Promise((resolve, reject) => {
        connection.execute({
          sqlText: query,
          binds: [TIC_PRIORITY, TIC_STATUS, TIC_NAME, CLIENT_ID, DENEKA_ID],
          complete: (err, stmt, rows) => {
            if (err) {
              console.error('Failed to execute statement:', err);
              reject(err);
            }
            console.log('Ticket created:', rows);
            res.json({ message: "Ticket created successfully" });
            resolve(rows);
          }
        });
      });
    } catch (error) {
      console.error('Error during ticket creation:', error);
      res.status(500).json({ message: "Ticket creation failed due to an error." });
    } finally {
      if (connection) {
        connection.destroy();
      }
    }
  };
  
  module.exports = { createTicket };
  
const snowflake = require('snowflake-sdk');
const {connectionPool, connectionOptions} = require('../config/snowflake');

const createInquiry = async (req, res) => {
    let connection = null;
    console.log("Trying connection");
    try {
      console.log("Trying connection");
      // Extract inquiry details from the request body
      const { title, categoryId, description, link } = req.body;
  
      // Validation: Ensure all required fields are provided
      if (!title || !link) {
        return res.status(400).json({ message: "Missing required fields." });
      }
  
      // Connect to Snowflake
      connection = snowflake.createConnection(connectionOptions);
  
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
      const insertInquiry = `
        INSERT INTO DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.INQUIRY
          (INQ_TITLE, INQ_CATEGORY_ID, INQ_DESC, INQ_LINK, INQ_DATE)
        VALUES
          (?, ?, ?, ?, CURRENT_TIMESTAMP());
      `;
  
      // Execute the insert statement
      await new Promise((resolve, reject) => {
        connection.execute({
          sqlText: insertInquiry,
          binds: [title, categoryId, description, link],
          complete: (err, stmt, rows) => {
            if (err) {
              console.error('Failed to execute statement:', err);
              reject(err);
            }
            console.log('Inquiry created:', rows);
            resolve(rows);
          }
        });
      });
  
      // Respond to the client indicating success
      res.json({ message: "Inquiry created successfully" });
    } catch (error) {
      console.error('Error during inquiry creation:', error);
      res.status(500).json({ message: "Inquiry creation failed due to an error." });
    } finally {
      // Always close the connection whether the try block succeeds or not
      if (connection) {
        connection.destroy();
      }
    }
  };

  const listAllInquiries = async (req, res) => {
    let connection = null;
    try {
      console.log("Trying connection");
      connection = snowflake.createConnection(connectionOptions);
  
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
        SELECT * FROM DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.INQUIRY;
      `;
  
      await new Promise((resolve, reject) => {
        connection.execute({
          sqlText: query,
          complete: (err, stmt, rows) => {
            if (err) {
              console.error('Failed to execute statement:', err);
              reject(err);
            }
            console.log('Inquiries retrieved:', rows);
            res.json(rows);
            resolve(rows);
          }
        });
      });
    } catch (error) {
      console.error('Error during listing inquiries:', error);
      res.status(500).json({ message: "Failed to list inquiries due to an error." });
    } finally {
      if (connection) {
        connection.destroy();
      }
    }
  };
  


  const viewSingleInquiry = async (req, res) => {
    let connection = null;
    try {
      console.log("Trying connection");
      connection = snowflake.createConnection(connectionOptions);
  
      await new Promise((resolve, reject) => {
        connection.connect((err, conn) => {
          if (err) {
            console.error('Unable to connect to Snowflake:', err);
            reject(err);
          }
          resolve(conn);
        });
      });
  
      const inqId = req.params.id; // Assuming the ID is passed as a URL parameter
      const query = `
        SELECT * FROM DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.INQUIRY
        WHERE INQ_ID = ?;
      `;
  
      await new Promise((resolve, reject) => {
        connection.execute({
          sqlText: query,
          binds: [inqId],
          complete: (err, stmt, rows) => {
            if (err) {
              console.error('Failed to execute statement:', err);
              reject(err);
            }
            if (rows.length > 0) {
              console.log('Inquiry retrieved:', rows[0]);
              res.json(rows[0]);
            } else {
              res.status(404).json({ message: "Inquiry not found." });
            }
            resolve(rows);
          }
        });
      });
    } catch (error) {
      console.error('Error during viewing single inquiry:', error);
      res.status(500).json({ message: "Failed to view inquiry due to an error." });
    } finally {
      if (connection) {
        connection.destroy();
      }
    }
  };

  



  // delete inquiry
  const deleteInquiry = async (req, res) => {
    let connection = null;

    try {
        const { inqId } = req.body; // Assuming you're passing the inquiry ID as a URL parameter

        if (!inqId) {
            return res.status(400).json({ message: "Missing inquiry ID." });
        }

        // Connect to Snowflake
        connection = snowflake.createConnection(connectionOptions);

        await new Promise((resolve, reject) => {
            connection.connect((err, conn) => {
                if (err) {
                    console.error('Unable to connect to Snowflake:', err);
                    reject(err);
                }
                resolve(conn);
            });
        });

        // Define the SQL delete statement
        const deleteInquirySQL = `
            DELETE FROM DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.INQUIRY
            WHERE INQ_ID = ?;
        `;

        // Execute the delete statement
        await new Promise((resolve, reject) => {
            connection.execute({
                sqlText: deleteInquirySQL,
                binds: [inqId],
                complete: (err, stmt, rows) => {
                    if (err) {
                        console.error('Failed to execute statement:', err);
                        reject(err);
                    }
                    console.log('Inquiry deleted:', rows);
                    resolve(rows);
                }
            });
        });

        // Respond to the client indicating success
        res.json({ message: "Inquiry deleted successfully" });
    } catch (error) {
        console.error('Error during inquiry deletion:', error);
        res.status(500).json({ message: "Inquiry deletion failed due to an error." });
    } finally {
        // Always close the connection whether the try block succeeds or not
        if (connection) {
            connection.destroy();
        }
    }
};

module.exports = { createInquiry, viewSingleInquiry, listAllInquiries , deleteInquiry};

  
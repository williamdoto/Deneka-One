const createInquiry = async (req, res) => {
    let connection = null;
  
    try {
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

  module.exports = { createInquiry };

  
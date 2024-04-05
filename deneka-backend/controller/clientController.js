// Function to create a new client
const createClient = async (req, res) => {
    let connection = snowflake.createConnection(connectionOptions);

    try {
        // Connect to Snowflake
        await new Promise((resolve, reject) => {
            connection.connect((err, conn) => {
                if (err) {
                    console.error('Unable to connect to Snowflake:', err);
                    reject(err);
                }
                resolve(conn);
            });
        });

        const { clientName, clientEmail, clientCity, clientStreet, clientCountry, clientPostcode, clientState, companyId, employeeId } = req.body;

        // Validation: Ensure all required fields are provided
        if (!clientName || !clientEmail) {
            return res.status(400).json({ message: "Missing required fields: clientName or clientEmail." });
        }

        // Define the SQL insert statement
        const insertSql = `
            INSERT INTO DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.CLIENT (
                CLIENT_NAME, CLIENT_EMAIL, CLIENT_CITY, CLIENT_STREET, CLIENT_COUNTRY, CLIENT_POSTCODE, CLIENT_STATE, COMPANY_ID, EMPLOYEE_ID
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;

        // Execute the insert statement
        await new Promise((resolve, reject) => {
            connection.execute({
                sqlText: insertSql,
                binds: [clientName, clientEmail, clientCity, clientStreet, clientCountry, clientPostcode, clientState, companyId, employeeId],
                complete: (err, stmt, rows) => {
                    if (err) {
                        console.error('Failed to execute statement:', err);
                        reject(err);
                    }
                    console.log('Client created:', rows);
                    resolve(rows);
                }
            });
        });

        // Respond to the client indicating success
        res.json({ message: "Client created successfully" });
    } catch (error) {
        console.error('Error during client creation:', error);
        res.status(500).json({ message: "Client creation failed due to an error." });
    } finally {
        // Always close the connection
        if (connection) {
            connection.destroy();
        }
    }
};

// Function to delete an existing client
const deleteClient = async (req, res) => {
    let connection = snowflake.createConnection(connectionOptions);

    try {
        // Connect to Snowflake
        await new Promise((resolve, reject) => {
            connection.connect((err, conn) => {
                if (err) {
                    console.error('Unable to connect to Snowflake:', err);
                    reject(err);
                }
                resolve(conn);
            });
        });

        const { clientId } = req.body; // Assuming the client ID is passed in the request body

        // Define the SQL delete statement
        const deleteSql = `
            DELETE FROM DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.CLIENT
            WHERE CLIENT_ID = ?;
        `;

        // Execute the delete statement
        await new Promise((resolve, reject) => {
            connection.execute({
                sqlText: deleteSql,
                binds: [clientId],
                complete: (err, stmt, rows) => {
                    if (err) {
                        console.error('Failed to execute statement:', err);
                        reject(err);
                    }
                    console.log('Client deleted:', rows);
                    resolve(rows);
                }
            });
        });

        // Respond to the client indicating success
        res.json({ message: "Client deleted successfully" });
    } catch (error) {
        console.error('Error during client deletion:', error);
        res.status(500).json({ message: "Client deletion failed due to an error." });
    } finally {
        // Always close the connection
        if (connection) {
            connection.destroy();
        }
    }
};

// Function to view all clients
const viewAllClients = async (req, res) => {
    let connection = snowflake.createConnection(connectionOptions);

    try {
        // Connect to Snowflake
        await new Promise((resolve, reject) => {
            connection.connect((err, conn) => {
                if (err) {
                    console.error('Unable to connect to Snowflake:', err);
                    reject(err);
                }
                resolve(conn);
            });
        });

        // Define the SQL select statement
        const selectSql = `
            SELECT *
            FROM DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.CLIENT;
        `;

        // Execute the select statement
        await new Promise((resolve, reject) => {
            connection.execute({
                sqlText: selectSql,
                complete: (err, stmt, rows) => {
                    if (err) {
                        console.error('Failed to execute statement:', err);
                        reject(err);
                    }
                    console.log('Clients retrieved:', rows);
                    res.json({ clients: rows });
                    resolve();
                }
            });
        });
    } catch (error) {
        console.error('Error retrieving clients:', error);
        res.status(500).json({ message: "Failed to retrieve clients due to an error." });
    } finally {
        // Always close the connection
        if (connection) {
            connection.destroy();
        }
    }
};

// Function to view a client by its ID
const viewClientById = async (req, res) => {
    let connection = snowflake.createConnection(connectionOptions);

    try {
        // Connect to Snowflake
        await new Promise((resolve, reject) => {
            connection.connect((err, conn) => {
                if (err) {
                    console.error('Unable to connect to Snowflake:', err);
                    reject(err);
                }
                resolve(conn);
            });
        });

        const { clientId } = req.params; // Get the client ID from URL params

        // Define the SQL select statement
        const selectSql = `
            SELECT *
            FROM DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.CLIENT
            WHERE CLIENT_ID = ?;
        `;

        // Execute the select statement
        await new Promise((resolve, reject) => {
            connection.execute({
                sqlText: selectSql,
                binds: [clientId],
                complete: (err, stmt, rows) => {
                    if (err) {
                        console.error('Failed to execute statement:', err);
                        reject(err);
                    }
                    console.log('Client retrieved:', rows);
                    if (rows.length === 0) {
                        return res.status(404).json({ message: "Client not found" });
                    }
                    res.json({ client: rows[0] });
                    resolve();
                }
            });
        });
    } catch (error) {
        console.error('Error retrieving client:', error);
        res.status(500).json({ message: "Failed to retrieve client due to an error." });
    } finally {
        // Always close the connection
        if (connection) {
            connection.destroy();
        }
    }
};

module.exports = { createClient, deleteClient, viewAllClients, viewClientById };

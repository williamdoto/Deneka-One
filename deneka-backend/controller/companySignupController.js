const snowflake = require('snowflake-sdk');
const { connectionOptions } = require('../config/snowflake');
const { v4: uuidv4 } = require('uuid');

const companySignUp = async (req, res) => {
    let connection;
    try {
        const { companyName, abn, companyStreet, country, state, city, postCode } = req.body;
        
        if (!companyName || !abn || !companyStreet || !country || !state || !city || !postCode) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const companyId = uuidv4();

        const insertCompany = `
            INSERT INTO DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.COMPANY
            (COMPANY_ID, COMPANY_NAME, ABN, COMPANY_STREET, COUNTRY, STATE, CITY, POST_CODE)
            VALUES
            (?, ?, ?, ?, ?, ?, ?, ?);
        `;

        const binds = [companyId, companyName, abn, companyStreet, country, state, city, postCode];

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

        await new Promise((resolve, reject) => {
            connection.execute({
                sqlText: insertCompany,
                binds: binds,
                complete: (err, stmt, rows) => {
                    if (err) {
                        console.error('Failed to execute statement:', err);
                        reject(err);
                    }
                    console.log('Company registered:', rows);
                    resolve(rows);
                }
            });
        });

        res.json({ message: "Company signed up successfully" });
    } catch (error) {
        console.error('Error during company signup:', error);
        res.status(500).json({ message: "Company signup failed due to an error." });
    } finally {
        if (connection) {
            connection.destroy();
        }
    }
};

module.exports = { companySignUp };

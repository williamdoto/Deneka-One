const snowflake = require('snowflake-sdk');
const {connectionPool, connectionOptions} = require('../config/snowflake');

const createTag = async (req, res) => {
    let connection = null;
    try {
        console.log("Trying connection");
        const { tagName } = req.body;

        // Validation: Ensure tag name is provided
        if (!tagName) {
            return res.status(400).json({ message: "Tag name is required." });
        }

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

        // Check if tag name already exists
        const checkTagQuery = `
            SELECT TAG_ID
            FROM DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.TAGS
            WHERE TAG_NAME = ?;
        `;

        const existingTag = await new Promise((resolve, reject) => {
            connection.execute({
                sqlText: checkTagQuery,
                binds: [tagName],
                complete: (err, stmt, rows) => {
                    if (err) {
                        console.error('Failed to execute statement:', err);
                        reject(err);
                    }
                    resolve(rows);
                }
            });
        });

        if (existingTag.length > 0) {
            return res.status(409).json({ message: "Tag with the same name already exists." });
        }

        // If tag name doesn't exist, insert the new tag
        const insertQuery = `
            INSERT INTO DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.TAGS
            (TAG_NAME)
            VALUES
            (?);
        `;

        await new Promise((resolve, reject) => {
            connection.execute({
                sqlText: insertQuery,
                binds: [tagName],
                complete: (err, stmt, rows) => {
                    if (err) {
                        console.error('Failed to execute statement:', err);
                        reject(err);
                    }
                    console.log('Tag created:', rows);
                    res.status(201).json({ message: "Tag created successfully" });
                    resolve(rows);
                }
            });
        });
    } catch (error) {
        console.error('Error during tag creation:', error);
        res.status(500).json({ message: "Tag creation failed due to an error." });
    } finally {
        if (connection) {
            connection.destroy();
        }
    }
};


const associateTagWithTicket = async (req, res) => {
    let connection = null;
    try {
        console.log("Trying connection");
        const { ticketId, tagId } = req.body;

        // Validation: Ensure required fields are provided
        if (!ticketId || !tagId) {
            return res.status(400).json({ message: "Missing required fields." });
        }

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

        const insertQuery = `
            INSERT INTO DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.TICKET_TAGS
                (TICKET_ID, TAG_ID)
            VALUES
                (?, ?);
        `;

        await new Promise((resolve, reject) => {
            connection.execute({
                sqlText: insertQuery,
                binds: [ticketId, tagId],
                complete: (err, stmt, rows) => {
                    if (err) {
                        console.error('Failed to execute statement:', err);
                        reject(err);
                    }
                    console.log('Tag associated with ticket:', rows);
                    res.json({ message: "Tag associated with ticket successfully" });
                    resolve(rows);
                }
            });
        });
    } catch (error) {
        console.error('Error during associating tag with ticket:', error);
        res.status(500).json({ message: "Failed to associate tag with ticket due to an error." });
    } finally {
        if (connection) {
            connection.destroy();
        }
    }
};

const createTagAndAssociateWithTicket = async (req, res) => {
    let connection = null;
    try {
        console.log("Trying connection");
        const { ticketId, tagName } = req.body;

        // Validation: Ensure required fields are provided
        if (!ticketId || !tagName) {
            return res.status(400).json({ message: "Missing required fields." });
        }

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

        // Check if the tag already exists
        const checkTagQuery = `
            SELECT COUNT(*) AS count
            FROM DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.TAGS
            WHERE TAG_NAME = ?;
        `;

        const tagCheckResult = await new Promise((resolve, reject) => {
            connection.execute({
                sqlText: checkTagQuery,
                binds: [tagName],
                complete: (err, stmt, rows) => {
                    if (err) {
                        console.error('Failed to execute tag check statement:', err);
                        reject(err);
                    }
                    resolve(rows[0].COUNT);
                }
            });
        });

        if (tagCheckResult === 0) {
            // If the tag doesn't exist, create it
            await createTag(req, res);
        }

        // Find the tag ID based on the tag name
        const findTagIdQuery = `
            SELECT TAG_ID
            FROM DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.TAGS
            WHERE TAG_NAME = ?;
        `;

        const tagIdResult = await new Promise((resolve, reject) => {
            connection.execute({
                sqlText: findTagIdQuery,
                binds: [tagName],
                complete: (err, stmt, rows) => {
                    if (err) {
                        console.error('Failed to execute tag ID query:', err);
                        reject(err);
                    }
                    console.log('Tag ID found:', rows);
                    resolve(rows);
                }
            });
        });

        if (!tagIdResult || tagIdResult.length === 0 || !tagIdResult[0].hasOwnProperty('TAG_ID')) {
            throw new Error('Failed to retrieve tag ID.');
        }

        const tagId = tagIdResult[0].TAG_ID;

        // Associate the tag with the ticket
        const insertTicketTagQuery = `
            INSERT INTO DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.TICKET_TAGS
                (TICKET_ID, TAG_ID)
            VALUES
                (?, ?);
        `;

        await new Promise((resolve, reject) => {
            connection.execute({
                sqlText: insertTicketTagQuery,
                binds: [ticketId, tagId],
                complete: (err, stmt, rows) => {
                    if (err) {
                        console.error('Failed to execute ticket tag insertion statement:', err);
                        reject(err);
                    }
                    console.log('Tag associated with ticket:', rows);
                    res.json({ message: "Tag created and associated with ticket successfully", tagId });
                    resolve(rows);
                }
            });
        });
    } catch (error) {
        console.error('Error during creating and associating tag with ticket:', error);
        res.status(500).json({ message: "Failed to create and associate tag with ticket due to an error." });
    } finally {
        if (connection) {
            connection.destroy();
        }
    }
};


module.exports = { createTag, associateTagWithTicket, createTagAndAssociateWithTicket, };
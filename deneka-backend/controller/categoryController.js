const snowflake = require('snowflake-sdk');
const { connectionOptions } = require('../config/snowflake');

// Function to create a new category
const createCategory = async (req, res) => {
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

        const { catName, imageUrl } = req.body;

        // Validation: Ensure all required fields are provided
        if (!catName) {
            return res.status(400).json({ message: "Missing required field: catName." });
        }

        // Define the SQL insert statement
        const insertSql = `
            INSERT INTO DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.CATEGORY (CAT_NAME, IMAGE_URL)
            VALUES (?, ?);
        `;

        // Execute the insert statement
        await new Promise((resolve, reject) => {
            connection.execute({
                sqlText: insertSql,
                binds: [catName, imageUrl],
                complete: (err, stmt, rows) => {
                    if (err) {
                        console.error('Failed to execute statement:', err);
                        reject(err);
                    }
                    console.log('Category created:', rows);
                    resolve(rows);
                }
            });
        });

        // Respond to the client indicating success
        res.json({ message: "Category created successfully" });
    } catch (error) {
        console.error('Error during category creation:', error);
        res.status(500).json({ message: "Category creation failed due to an error." });
    } finally {
        // Always close the connection
        if (connection) {
            connection.destroy();
        }
    }
};

// Function to delete an existing category
const deleteCategory = async (req, res) => {
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

        const { catId } = req.body; // Assuming the category ID is passed in the request body

        // Define the SQL delete statement
        const deleteSql = `
            DELETE FROM DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.CATEGORY
            WHERE CAT_ID = ?;
        `;

        // Execute the delete statement
        await new Promise((resolve, reject) => {
            connection.execute({
                sqlText: deleteSql,
                binds: [catId],
                complete: (err, stmt, rows) => {
                    if (err) {
                        console.error('Failed to execute statement:', err);
                        reject(err);
                    }
                    console.log('Category deleted:', rows);
                    resolve(rows);
                }
            });
        });

        // Respond to the client indicating success
        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error('Error during category deletion:', error);
        res.status(500).json({ message: "Category deletion failed due to an error." });
    } finally {
        // Always close the connection
        if (connection) {
            connection.destroy();
        }
    }
};

const viewAllCategories = async (req, res) => {
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
            SELECT CAT_ID, CAT_NAME, IMAGE_URL
            FROM DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.CATEGORY;
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
                    console.log('Categories retrieved:', rows);
                    res.json({ categories: rows });
                    resolve();
                }
            });
        });
    } catch (error) {
        console.error('Error retrieving categories:', error);
        res.status(500).json({ message: "Failed to retrieve categories due to an error." });
    } finally {
        // Always close the connection
        if (connection) {
            connection.destroy();
        }
    }
};

// Function to view a category by its ID
const viewCategoryById = async (req, res) => {
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

        const { catId } = req.params; // Get the category ID from URL params

        // Define the SQL select statement
        const selectSql = `
            SELECT CAT_ID, CAT_NAME, IMAGE_URL
            FROM DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.CATEGORY
            WHERE CAT_ID = ?;
        `;

        // Execute the select statement
        await new Promise((resolve, reject) => {
            connection.execute({
                sqlText: selectSql,
                binds: [catId],
                complete: (err, stmt, rows) => {
                    if (err) {
                        console.error('Failed to execute statement:', err);
                        reject(err);
                    }
                    console.log('Category retrieved:', rows);
                    if (rows.length === 0) {
                        return res.status(404).json({ message: "Category not found" });
                    }
                    res.json({ category: rows[0] });
                    resolve();
                }
            });
        });
    } catch (error) {
        console.error('Error retrieving category:', error);
        res.status(500).json({ message: "Failed to retrieve category due to an error." });
    } finally {
        // Always close the connection
        if (connection) {
            connection.destroy();
        }
    }
};


module.exports = { createCategory, deleteCategory, viewCategoryById, viewAllCategories };

  
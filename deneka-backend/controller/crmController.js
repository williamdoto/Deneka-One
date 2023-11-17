const express = require('express');
const router = express.Router();
const snowflake = require('snowflake-sdk');
const { connectionOptions } = require('../config/snowflake.js');

// Create a Snowflake connection
const connection = snowflake.createConnection(connectionOptions);

connection.connect((err, conn) => {
  if (err) {
    console.error('Unable to connect to Snowflake:', err);
  } else {
    console.log('Successfully connected to Snowflake');
  }
});

// Search a Service
router.get('/services/search', async (req, res) => {
  const { name } = req.query;
  const query = `SELECT * FROM DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.SERVICE WHERE LOWER(S_NAME) LIKE LOWER(?)`;
  connection.execute({
    sqlText: query,
    binds: [`%${name}%`],
    complete: (err, stmt, rows) => {
      if (err) {
        console.error('Failed to execute query:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(rows);
    }
  });
});

// Create a Service
router.post('/services', async (req, res) => {
  const { sId, sName, sDesc, sPrice, catId } = req.body;
  const query = `INSERT INTO DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.SERVICE (S_ID, S_NAME, S_DESC, S_PRICE, CAT_ID) VALUES (?, ?, ?, ?, ?)`;
  connection.execute({
    sqlText: query,
    binds: [sId, sName, sDesc, sPrice, catId],
    complete: (err) => {
      if (err) {
        console.error('Failed to execute query:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(201).json({ success: true, message: 'Service created successfully' });
    }
  });
});

// Update a Service
router.put('/services/:id', async (req, res) => {
  const { sName, sDesc, sPrice, catId } = req.body;
  const sId = req.params.id;
  const query = `UPDATE DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.SERVICE SET S_NAME = ?, S_DESC = ?, S_PRICE = ?, CAT_ID = ? WHERE S_ID = ?`;
  connection.execute({
    sqlText: query,
    binds: [sName, sDesc, sPrice, catId, sId],
    complete: (err) => {
      if (err) {
        console.error('Failed to execute query:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({ success: true, message: 'Service updated successfully' });
    }
  });
});

module.exports = router;

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

// Search a Category
router.get('/categories/search', async (req, res) => {
  const { name } = req.query;
  const query = `SELECT * FROM DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.CATEGORY WHERE LOWER(CAT_NAME) LIKE LOWER(?)`;
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

// Create a Category
router.post('/categories', async (req, res) => {
  const { catName } = req.body;
  const query = `INSERT INTO DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.CATEGORY (CAT_NAME) VALUES (?)`;
  connection.execute({
    sqlText: query,
    binds: [catName],
    complete: (err) => {
      if (err) {
        console.error('Failed to execute query:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(201).json({ success: true, message: 'Category created successfully' });
    }
  });
});

// Update a Category
router.put('/categories/:id', async (req, res) => {
  const catName = req.body.name;
  const catId = req.params.id;
  const query = `UPDATE DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.CATEGORY SET CAT_NAME = ? WHERE CAT_ID = ?`;
  connection.execute({
    sqlText: query,
    binds: [catName, catId],
    complete: (err) => {
      if (err) {
        console.error('Failed to execute query:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({ success: true, message: 'Category updated successfully' });
    }
  });
});

// Delete a Category
router.delete('/categories/:id', async (req, res) => {
  const catId = req.params.id;
  const query = `DELETE FROM DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.CATEGORY WHERE CAT_ID = ?`;
  connection.execute({
    sqlText: query,
    binds: [catId],
    complete: (err) => {
      if (err) {
        console.error('Failed to execute query:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({ success: true, message: 'Category deleted successfully' });
    }
  });
});
// Associate a Service with a Category
router.post('/services/:serviceId/categories/:categoryId', async (req, res) => {
  const { serviceId, categoryId } = req.params;
  const query = `INSERT INTO DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.SERVICE_CATEGORY (S_ID, CAT_ID) VALUES (?, ?)`;
  connection.execute({
    sqlText: query,
    binds: [serviceId, categoryId],
    complete: (err) => {
      if (err) {
        console.error('Failed to execute query:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(201).json({ success: true, message: 'Service associated with category successfully' });
    }
  });
});

// Remove a Service's association with a Category
router.delete('/services/:serviceId/categories/:categoryId', async (req, res) => {
  const { serviceId, categoryId } = req.params;
  const query = `DELETE FROM DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.SERVICE_CATEGORY WHERE S_ID = ? AND CAT_ID = ?`;
  connection.execute({
    sqlText: query,
    binds: [serviceId, categoryId],
    complete: (err) => {
      if (err) {
        console.error('Failed to execute query:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({ success: true, message: 'Service-category association removed successfully' });
    }
  });
});

// List Categories for a Service
router.get('/services/:serviceId/categories', async (req, res) => {
  const { serviceId } = req.params;
  const query = `SELECT CAT_ID FROM DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.SERVICE_CATEGORY WHERE S_ID = ?`;
  connection.execute({
    sqlText: query,
    binds: [serviceId],
    complete: (err, stmt, rows) => {
      if (err) {
        console.error('Failed to execute query:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(rows);
    }
  });
});

// List Services in a Category
router.get('/categories/:categoryId/services', async (req, res) => {
  const { categoryId } = req.params;
  const query = `SELECT S_ID FROM DASHBOARD_TEST_DATABASE.DASHBOARD_SIGNUP.SERVICE_CATEGORY WHERE CAT_ID = ?`;
  connection.execute({
    sqlText: query,
    binds: [categoryId],
    complete: (err, stmt, rows) => {
      if (err) {
        console.error('Failed to execute query:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(rows);
    }
  });
});


module.exports = router;

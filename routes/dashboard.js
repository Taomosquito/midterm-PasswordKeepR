const express = require('express');
const router = express.Router();
const db = require('../db/connection'); // Assuming you have a db connection module
const dbEvents = require('../db/connection');
const cookieSession = require("cookie-session");

// This route handles GET requests to /dashboard
router.get('/', (req, res) => {
  const userId = req.session.user_id;

  // Query to fetch the necessary data
  db.query(`
    SELECT users.email, organizations.organization, passwords.pass, passwords.site_name, passwords.site_url, category
    FROM users
    JOIN organizations ON organizations.id = users.organization_id
    JOIN passwords ON users.id = passwords.user_id
    WHERE users.id = $1`, [userId])
    .then(data => {
      const passwords = data.rows;

      // Render the dashboard and pass the data
      res.render('dashboard', { passwords: passwords });
    })
    .catch(err => {
      console.error('Error executing query', err.stack);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;

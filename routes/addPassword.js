const express = require('express');
const router = express.Router();
const db = require('../db/connection'); // Assuming you have a db connection module


let user_id = null;
// Handle GET request for adding and editing a password
router.get('/', (req, res) => {
  user_id = req.session.user_id;
  res.render('addPassword');
})

router.post('/', (req, res) => {
  // Implement adding a new password
  const { password, site_name, site_url, category, username } = req.body;

  const queryString =
  `INSERT INTO passwords (pass, created_at, site_name, site_url, user_id, category, username)
  VALUES ($1, NOW(), $2, $3, $4, $5, $6) RETURNING id`

  const queryStringValues = [password, site_name, site_url, user_id, category, username];

  db.query(queryString, queryStringValues)
  .then(() => {
    res.redirect('/dashboard');
  })
  .catch((err) => {
    console.error('unexpected error occurred')
  })

 res.redirect('/add-password');
});

module.exports = router;

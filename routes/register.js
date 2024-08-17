const express = require('express');
const db = require('../db/connection');
const router = express.Router();
const bcrypt = require("bcryptjs");

router.post('/', (req, res) => {
  const { email, password, organization } = req.body;

  console.log(email, password, organization);

  // Validate the input
  if (!email || !password || !organization) {
    return res.status(400).send('Please provide an email, password, and organization');
    }

  // Check if the email is already registered
  db.query('SELECT id FROM users WHERE email = $1', [email])
    .then(existingUser => {
      if (existingUser.rows.length > 0) {
      //  return res.status(400).send('That email is already in use');
        return Promise.reject('Email already in use'); // Stop further execution
      }

      // Email is not in use, insert the new organization
      return db.query(
        'INSERT INTO organizations (created_at, organization ) VALUES (NOW(), $1) RETURNING id',
        [organization]
      );
    })
    .then(orgResult => {
      const organization_id = orgResult.rows[0].id;

      // Hash the password
      const salt = bcrypt.genSaltSync(); // generates salt
      const hashedPassword = bcrypt.hashSync(password, salt); // hashes password
      return { hashedPassword, organization_id };
    })
    .then(({ hashedPassword, organization_id }) => {
      // Insert the new user into the users table with the organization_id
      return db.query(
        `INSERT INTO users (email, organization_id, created_at, pass)
         VALUES ($1, $2, NOW(), $3) RETURNING id`,
        [email, organization_id, hashedPassword]
      );
    })
    .then(userResult => {
      // Store the user's ID in the session
      req.session.userId = userResult.rows[0].id;

      return res.send("Data is entered!");

    })
    .catch(err => {
      if (err === 'Email already in use') {
        return res.status(400).send('Email already in use');
      }
      console.error('Error registering user:', err);
      return res.status(500).send('Internal server error.');
    });
});

module.exports = router;

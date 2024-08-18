const express = require('express');
const router = express.Router();
const db = require('../db/connection'); // Assuming you have a db connection module
const dbEvents = require('../db/connection');
const cookieSession = require("cookie-session");

/*
Data Required: email, organization, site_name, site_url, password (for each site), category (for each site)

Functionality: AddPasswords. Generate Random Passwords.

*/
router.get('/', (req, res) => {


  db.query(`SELECT users.email, organizations.organization, passwords.pass, passwords.site_name, passwords.site_url, categories.category
    FROM users
    JOIN organizations ON organizations.id = users.organization_id
    JOIN passwords ON users.id = passwords.user_id
    JOIN categories ON categories.id = passwords.category_id
    WHERE $1`, [/* variable assignment from cookie here */])

  res.render('dashboard');
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../db/connection'); // Assuming you have a db connection module

router.get('/', (req, res) => {
  res.render('addOrganization');
})

router.post('/', (req, res) => {
  // Implement adding a new password
  const { organization } = req.body;

  const queryString =
  `INSERT INTO organizations (organization) VALUES ($1) RETURNING id`

  const queryStringValues = [organization];

  db.query(queryString, queryStringValues)
  .then(() => {
    res.redirect('/dashboard');
  })
  .catch((err) => {
    console.error('unexpected error occurred')
  })

 res.redirect('/add-organization');
});

module.exports = router;

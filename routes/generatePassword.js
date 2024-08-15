const express = require('express');
const router = express.Router();

// Handle GET request for generating a password
router.get('/', (req, res) => {
  console.log("I'm in the generate password GET");
  res.render('generatePassword');
});

// Handle POST request for submitting the generated password
router.post('/', (req, res) => {
  // Logic to handle form submission
  res.send('Password generated');
});

module.exports = router;

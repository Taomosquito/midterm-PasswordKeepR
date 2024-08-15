const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Implement logout functionality
  res.render('index');
});

module.exports = router;

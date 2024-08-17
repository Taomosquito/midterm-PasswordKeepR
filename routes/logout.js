const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Implement logout functionality
  req.session = null; // clears cookie
  res.render('index');
});

module.exports = router;

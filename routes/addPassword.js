const express = require('express');
const router = express.Router();

// Handle GET request for adding and editing a password
router.get('/', (req, res) => {
  res.render('addEditPassword');
})

router.post('/', (req, res) => {
  // Implement adding a new password
  res.send('Add Password');
});

module.exports = router;

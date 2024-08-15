const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Terms of Service');
});

module.exports = router;

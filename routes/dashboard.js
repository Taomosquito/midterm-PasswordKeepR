const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log("I'm in dashboard");
  res.render('dashboard');
});

module.exports = router;

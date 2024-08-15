const express = require('express');
const router = express.Router();

router.get('/privacy-policy', (req, res) => {
  res.send('Privacy Policy');
});

router.get('/terms-of-service', (req, res) => {
  res.send('Terms of Service');
});

// router.get('/contact', (req, res) => {
//   res.render('contact');
// });

module.exports = router;

const express = require('express');
const router = express.Router();

function generatePassword(options) {
  const {
    length = 8, // Default length is 8 characters
    hasLowercase = true,
    hasUppercase = true,
    hasNumbers = true,
    hasSymbols = true
  } = options;

  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

  let characterPool = '';

  // Add characters to the pool based on selected options
  if (hasLowercase) characterPool += lowercaseChars;
  if (hasUppercase) characterPool += uppercaseChars;
  if (hasNumbers) characterPool += numberChars;
  if (hasSymbols) characterPool += symbolChars;

  if (characterPool === '') {
    throw new Error('No character types selected for password generation.');
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterPool.length);
    password += characterPool[randomIndex];
  }

  return password;
}

// Handle GET request for generating a password
router.get('/', (req, res) => {
  const genPassCookie = req.session.genPassword; // Retrieve the session-stored password
  res.render('generatePassword', { genPassCookie }); // Pass the password to the template if needed
});

// Handle POST request for submitting the generated password
router.post('/', (req, res) => {
  // Extract form data
  const length = parseInt(req.body.length, 10); // Parse length as an integer
  const hasLowercase = req.body.lowercase === 'on';
  const hasUppercase = req.body.uppercase === 'on';
  const hasNumbers = req.body.numbers === 'on';
  const hasSymbols = req.body.symbols === 'on';

  const options = { length, hasLowercase, hasUppercase, hasNumbers, hasSymbols };
  const genPassword = generatePassword(options);

  // Store the generated password in the session
  req.session.genPassword = genPassword;



  res.redirect('/dashboard'); // Redirect to the dashboard or another page
});

module.exports = router;

// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const cookieSession = require("cookie-session");

const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const { generateRandomString } = require("./helpers"); //helper functions
const app = express();


app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

app.use(cookieSession({
  name: "session",
  keys: [ generateRandomString(10), generateRandomString(10)],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const dashboardRoutes = require('./routes/dashboard');
const genPasswordRoutes = require('./routes/generatePassword');
const addPasswordRoutes = require('./routes/addPassword');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const logoutRoutes = require('./routes/logout');
const policiesRoutes = require('./routes/privacyPolicy');
const termsOfServiceRoutes = require('./routes/termsOfService');
const contactRoutes = require('./routes/contact');
const editPassword = require('./routes/editPassword');
const deletePassword = require('./routes/deletePassword');
const addOrganization= require('./routes/addOrganization');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/generate-password', genPasswordRoutes);
app.use('/add-password', addPasswordRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/logout', logoutRoutes);
app.use('/privacy-policy', policiesRoutes);
app.use('/terms-of-service', termsOfServiceRoutes);
app.use('/contact', contactRoutes);
app.use('/edit-password', editPassword);
app.use('/delete-password', deletePassword);
app.use('/add-organization', addOrganization);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  const userId = req.session.user_id; // assigns the user_id cookie's value to userId
  if (!userId) { // if there is no user logged in, render the index page
    return res.render('index');  // Use return to ensure only one response is sent
  }
  res.redirect("/dashboard");  // If the user is logged in, redirect to the dashboard
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

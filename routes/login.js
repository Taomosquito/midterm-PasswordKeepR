const express = require('express');
const router = express.Router();
const db = require('../db/connection'); // Assuming you have a db connection module
const bcrypt = require("bcryptjs");

/* const getUserByEmail = function (email) {

  db.query(`SELECT email, pass FROM users WHERE email = $1`, [email])
    .then(user => {
      console.log(user.rows[0]);
    return user.rows[0];

    })
   .catch(() => {
    return null;
   });


}
 */

router.post('/', (req, res) => {
  // Implement login functionality

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send('Please provide an email and password');
    return;
  }


  // let foundUser = getUserByEmail(email);
  // console.log()

 let foundUser =  null;

 db.query(`SELECT id, email, pass FROM users WHERE email = $1`, [email])
      .then(user => {

        foundUser = user.rows[0];


        if (!foundUser ||  !bcrypt.compareSync(password, foundUser.pass)) { // if getUserByEmail returns null or the hash of the password provided doesn't match to the hash in the database
          res.status(403).send('Authentication failed');
          return;
        }

        req.session.email = foundUser.email; // create cookie with the id of the logged in user as its value
        req.session.user_id = foundUser.id;

        console.log(req.session.email, req.session.user_id);

        res.redirect('/dashboard');

      })
     .catch(() => {
      return foundUser;
  });

  // if (!foundUser ||  !bcrypt.compareSync(password, foundUser.pass)) { // if getUserByEmail returns null or the hash of the password provided doesn't match to the hash in the database
  //   res.status(403).send('Authentication failed');
  //   return;
  // }

  // req.session.user_id = foundUser.id; // create cookie with the id of the logged in user as its value
  // res.redirect('/dashboard'); should be this line


});

module.exports = router;

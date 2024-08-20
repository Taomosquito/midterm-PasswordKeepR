const express = require('express');
const router = express.Router();
const db = require('../db/connection'); // Assuming you have a db connection module


router.post('/:id', (req, res) => {
  const { id } = req.params;
  const { site_name, site_url, password } = req.body;
  const queries = [];

  if(site_name){
    queries.push(db.query('UPDATE passwords SET site_name = $1 WHERE id = $2', [site_name, id]));
  }
  if(site_url){
    queries.push(db.query('UPDATE passwords SET site_url = $1 WHERE id = $2', [site_url, id]));
  }
  if(password){
    queries.push(db.query('UPDATE passwords SET pass = $1 WHERE id = $2', [password, id]));
  }
  Promise.all(queries)
  .then(() =>{
    res.redirect('/dashboard')
  })
  .catch((err) => {
    res.status(500)
    .send({
      message: 'server side error',
      error: err.message
    })
  })

})

module.exports = router;

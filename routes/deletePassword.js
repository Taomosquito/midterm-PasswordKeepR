const express = require('express');
const router = express.Router();
const db = require('../db/connection'); // Assuming you have a db connection module


router.post('/:id', (req, res) => {
  const { id } = req.params;

  db.query(`DELETE FROM passwords WHERE id = $1`, [id])
  .then(() => {
    res.redirect('/dashboard')
  })
})

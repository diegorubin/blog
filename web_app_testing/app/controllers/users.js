const express = require('express'),
  router = express.Router();

router.get('/new', (req, res) => {
  res.render('users/new');
});

router.post('/new', (req, res) => {
  res.render('users/new');
});

module.exports = router;


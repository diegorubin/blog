const express = require('express'),
  router = express.Router();

router.get('/new', (req, res) => {
  res.render('users/new');
});

router.post('/', (req, res) => {
  res.render('users/new', {message: 'teste'});
});

module.exports = router;


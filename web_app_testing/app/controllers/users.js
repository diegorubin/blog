const express = require('express'),
  router = express.Router(),
  restClient = require('../services/restClient'),
  gateway = require('../../config/gateway');

router.get('/new', (req, res) => {
  res.render('users/new');
});

router.post('/', (req, res) => {
  restClient.request({
    url: gateway.createUserApi,
    method: 'post',
    data: req.body
  }).then((result) => {
    res.render('users/new', {message: result.data.message});
  }).catch((result) => {
    res.render('users/new', {message: 'error.on.create' });
  });
});

module.exports = router;


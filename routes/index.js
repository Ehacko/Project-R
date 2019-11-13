const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  options={};
  options.Date = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  res.render('index', {
    Title: 'RESTHOME',
    Options: options,
    ParamsGet: req.query
  });
});
router.all("*", function(req, res, next) {
  res.redirect('/');
});

module.exports = router;

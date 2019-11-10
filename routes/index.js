const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    Title: 'RESTHOME',
    ParamsGet: req.query
  });
});
router.all("*", function(req, res, next) {
  res.redirect('/');
});

module.exports = router;

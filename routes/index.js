const express = require('express');
const router = express.Router();

/**/
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const ObjectId = require('mongodb').ObjectID;

const url = 'mongodb+srv://ludji:root@test-w7rhz.mongodb.net/test?retryWrites=true&w=majority';


const client = new MongoClient(url, { useNewUrlParser: true });
/* */

const querinator = require('../tests/app');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    Title: 'RESTHOME',
    ParamsGet: req.query
  });
});

router.get('/test', function(req, res, next) {
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connection établie");

    const gogogo = async _ => {return querinator.findDoc('ingredients');};

    gogogo().then(value => {
      cl(value)
      res.render('indextest', {
        Title: 'RESTHOME',
        ParamsGet: req.query,
        a: value
      });
    }).catch((err) => { 'query error : ' + console.log(err); });
  });
});


router.all("*", function(req, res, next) {
  res.redirect('/');
});

function cl(a) {console.log(a)};

module.exports = router;
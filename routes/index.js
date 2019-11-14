const express = require('express');
const router = express.Router();

/**/
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const ObjectId = require('mongodb').ObjectID;

const url = 'mongodb+srv://ludji:root@test-w7rhz.mongodb.net/test?retryWrites=true&w=majority';

const dbName = 'Project-R';
const client = new MongoClient(url, { useNewUrlParser: true });
/* */

const findDoc = require('../tests/app');

client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connection établie");



});
const db = client.db(dbName);
const collIngredient = db.collection('ingredients');


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

router.get('/test', function(req, res, next) {

  const gogogo = async _ => { return db.collection('ingredients').find({}).sort({ Nom: 1 }).toArray(); };

  gogogo().then(value => {
    //client.close(); 

    res.render('indextest', {
      Title: 'RESTHOME',
      ParamsGet: req.query,
      a: value
    });
  }).catch((err) => { 'query error : ' + console.log(err); });
});


router.all("*", function(req, res, next) {
  res.redirect('/');
});

module.exports = router;

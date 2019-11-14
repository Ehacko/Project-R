const express = require('express');
const router = express.Router();

/**/
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const ObjectId = require('mongodb').ObjectID;

const url = 'mongodb+srv://ludji:root@test-w7rhz.mongodb.net/test?retryWrites=true&w=majority';


const client = new MongoClient(url, { useNewUrlParser: true });
/* */

const findDoc = require('../tests/app');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    Title: 'RESTHOME',
    ParamsGet: req.query
  });
});

router.get('/test', function(req, res, next) {

  if(req.query.recepices){
    coltarget="recepices";
    if(req.query.recepices=="All") findtarget={};
    else findtarget={Nom: req.query.recepices};
  }
  else if(req.query.ingrédients){
    coltarget="recepices";
    if(req.query.ingrédients=="All") findtarget={};
    else findtarget={Nom: req.query.ingrédients};
  }
  else if(req.query.search) coltarget=false;
  else {
    coltarget="menus";
    if(req.query.menus=="All") findtarget={};
    else findtarget={Date: req.query.menus};
  }
  if(coltarget){
    client.connect(function(err) {
      assert.equal(null, err);
      console.log("Connection établie");

      const gogogo = async _ => { return client.db('Project-R').collection('ingredients').find({}).sort({ Nom: 1 }).toArray(); };

      gogogo().then(value => {
        res.render('indextest', {
          Title: 'RESTHOME',
          ParamsGet: req.query,
          a: value
        });
      }).catch((err) => { 'query error : ' + console.log(err); });
    });
  } else {
    res.render('indextest', {
      Title: 'RESTHOME',
      ParamsGet: req.query
    });
  }
});


router.all("*", function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
const express = require('express');
const router  = express.Router();

/**/
const MongoClient = require('mongodb').MongoClient;
const ObjectId    = require('mongodb').ObjectID;
const assert      = require('assert');



/**/

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
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connection établie");

    const client = new MongoClient('mongodb+srv://ludji:root@test-w7rhz.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });  
    const gogogo = async _ => { return client.db('Project-R').collection('ingredients').find({}).sort({ Nom: 1 }).toArray(); };
  
    gogogo().then(value => {  
      res.render('indextest', {
        Title: 'RESTHOME',
        ParamsGet: req.query,
        a: value
      });
    }).catch((err) => { 'connection ingredients error : ' + console.log(err); });
  });
});


router.all("*", function(req, res, next) {
  res.redirect('/');
});

module.exports = router;
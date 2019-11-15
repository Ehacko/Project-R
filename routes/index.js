const express = require('express');
const router = express.Router();
/* */
//const querinator = require('../tests/app');
const querinator = require('../query').querinator;



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    Title: 'RESTHOME',
    ParamsGet: req.query
  });
});

router.get('/test', function(req, res, next) {
  if(req.query.recepices){
    coltarget="recettes";
    if(req.query.recepices.toLowerCase()=="all") findtarget={};
    else findtarget={Nom: req.query.recepices};
  }
  else if(req.query.ingredients){
    coltarget="ingredients";
    if(req.query.ingrédients.toLowerCase()=="all") findtarget={};
    else findtarget={Nom: req.query.ingrédients};
  }
  else if(req.query.search) coltarget=false;
  else {
    coltarget="menus";
    if(req.query.menus == "" ) findtarget={Date: new Date(new Date().toDateString()).valueOf()};
    if(req.query.menus.toLowerCase()=="all") findtarget={};
    else findtarget={Date: req.query.menus};
  }
  cl(coltarget)
  cl(findtarget)
  if(coltarget){
      const gogogo = async _ => { return querinator.findItem(coltarget, findtarget);};
  
      gogogo().then(value => {
        cl(value)
        res.render('indextest', {
          Title: 'RESTHOME',
          ParamsGet: req.query,
          a: value
        });
      }).catch((err) => { 'query error : ' + console.log(err); });
  } else {
    res.render('index', {
      Title: 'RESTHOME',
      ParamsGet: req.query
    });
  }
});


router.all("*", function(req, res, next) {
  res.redirect('/');
});

function cl(a) {console.log(a)};

module.exports = router;
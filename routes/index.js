const express = require('express');
const router = express.Router();
/* */
//const querinator = require('../tests/app');
const querinator = require('../query').querinator;

const ojtIf = function (a,b) {
  if(a) return a;
  else return b;
}

/* GET home page. */
router.get('/', function(req, res, next) {

  let J = new Date(new Date().toDateString()).valueOf()
  if(req.query.Recepices || req.query.recepices){
    coltarget="recettes";
    if(req.query.Recepices=="All" || req.query.Recepices=="All") findtarget={};
    else findtarget={Nom: ojtIf(req.query.Recepices,req.query.recepices)};
  }
  else if(req.query.Ingredients ||req.query.ingredients){
    coltarget="ingredients";
    if(req.query.Ingredients=="All" || req.query.ingredients=="All") findtarget={};
    else findtarget={Nom: ojtIf(req.query.Ingredients, req.query.ingredients) };
  }
  else if(req.query.Search || req.query.search) coltarget=false;
  else {
    coltarget="menus";
    if(req.query.Menus || req.query.menus){
      if(req.query.Menus == "All" || req.query.menus == "All") findtarget={};
      else findtarget={Date: ojtIf(req.query.Menus,req.query.menus)};
    }
    else findtarget={ Date: J};
  }
  if(coltarget){

    const gogogo = async _ => { return querinator.findItem(coltarget, findtarget);};
    gogogo().then(value => {

      res.render('index', {

        Title: 'RESTHOME',
        ParamsGet: req.query,
        db: value,
        Today: J

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
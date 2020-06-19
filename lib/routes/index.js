var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.cookies['userId']) {
    res.render('index', { title: 'Welcome to SuperLand by Nico, Livio, Aurelien, Loic and !!!!! Paulo !!!!! qui est authentifié !!!!!!' });
  } 
  else{
    res.render('index', { title: 'Welcome to SuperLand by Nico, Livio, Aurelien, Loic and !!!!! Paulo !!!!!' });
  }
  
});

module.exports = router;

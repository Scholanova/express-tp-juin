const { ResourceNotFoundError } = require('../errors')

var express = require('express');
var router = express.Router();
var userRepository = require('../repositories/userRepository')

/* GET home page. */
router.get('/', function(req, res, next) {
  if ( req.cookies.userId) {
    userRepository.get(req.cookies.userId)
      .then((user) => {
        res.render('index', { title: 'Express', user: user.name });
      })
      .catch((err) => {
        if (err instanceof ResourceNotFoundError) {
          res.render('index', { title: 'Express', user: null })
        } else {
          next(err)
        }
      })
  } else {
    res.render('index', { title: 'Express', user: null })
  }
  
});

module.exports = router;

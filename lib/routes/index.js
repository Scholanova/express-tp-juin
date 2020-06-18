var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'equipe2/Dienaba Noblesse Elimane Djibril' });
});

module.exports = router;

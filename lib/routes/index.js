var express = require('express');
var router = express.Router();
const userRepository = require('../repositories/userRepository')

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.cookies['userId']) {
    userRepository.get(req.cookies['userId'])
      .then((user) => {
        res.render('index', { title: user.nom, connected: true });
      })
      .catch(next)
  } else {
    res.render('index', { title: 'Un message sympa', connected: false });
  }
});

module.exports = router;

const router = require('express').Router()
const userRepository = require('../repositories/userRepository')


router.get('/', function (req, res, next) {
    userRepository.listAll()
      .then((users) => {
        res.render('user/list', { users })
      })
      .catch(next)
})

module.exports = router;
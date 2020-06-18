const router = require('express').Router()
const userRepository = require('../repositories/usersRepository')


router.get('/', function (req, res, next) {
    userRepository.listAll()
      .then((users) => {
        res.render('users/list', { users })
      })
      .catch(next)
})

module.exports = router;
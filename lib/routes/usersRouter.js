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

router.get('/new', function (req, res, next) {
  res.render('users/new')
})

router.get('/:id', function (req, res, next) {
  const userId = req.params.id

  userRepository.get(userId)
    .then((author) => {
      res.render('users/show', { users })
    })
    .catch(next)
})
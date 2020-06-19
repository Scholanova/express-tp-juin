const userRepository = require('../repositories/userRepository')

const router = require('express').Router()

router.get('/', function(req, res, next) {
    userRepository.listAll()
      .then((users) => {
          res.render('user/list', { title: 'Users', users })
      })
      .catch(next)
})

router.delete('/:userId', function(req, res, next) {
  const userId = req.params.userId

  userRepository.delete(userId)
    .then(() => {
      res.status(204).json({})
    })
})

module.exports = router
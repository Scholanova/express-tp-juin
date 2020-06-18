const userRepository = require('../repositories/userRepository')
const userService = require('../services/userService')
const router = require('express').Router()
const Joi = require('@hapi/joi')

router.get('/', function (req, res, next) {
    userRepository.listAll()
      .then((users) => {
        res.render('user/list', { users })
      })
      .catch(next)
})

router.delete('/:id', function (req, res, next) {
  userRepository.deleteById(req.params.id)
      .then((userResult) => {
        res.status(204).json({})
      })
      .catch(next)
  
})

module.exports = router;
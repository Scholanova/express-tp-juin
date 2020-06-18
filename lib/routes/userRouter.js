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

router.get('/new', function (req, res, next) {
    res.render('user/new')
  })

router.post('/new', function (req, res, next) {
  const userData = {
    pseudo: req.body['pseudo'],
    password: req.body['password'],
    nom: req.body['nom'],
  }
  return userService.create(userData)
    .then((user) => {
      res.redirect("/")
    })
    .catch((error) => {
      if (error instanceof Joi.ValidationError) {
        res.render('user/new', {
          values: {
            pseudo: req.body['pseudo'],
            password: req.body['password'],
            nom: req.body['nom'],
          },
          failedFields: error.details
        })
      } else {
        next(error)
      }
    })
})

module.exports = router
router.get('/:id', function (req, res, next) {
    const userId = req.params.id
  
    userRepository.get(userId)
      .then((user) => {
        res.render('user/show', { user })
      })
      .catch(next)
  })

module.exports = router;

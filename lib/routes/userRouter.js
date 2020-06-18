const userRepository = require('../repositories/userRepository')
const userService = require('../services/userService')
const router = require('express').Router()
const Joi = require('@hapi/joi')

router.get('/new', function (req, res, next) {
    res.render('user/new')
  })

router.post('/new', function (req, res, next) {
  const userData = {
    pseudo: req.body['pseudo'],
    password: req.body['password'],
    name: req.body['name'],
  }
  return userService.create(userData)
    .then((user) => {
      res.redirect(`index`)
    })
    .catch((error) => {
      if (error instanceof Joi.ValidationError) {
        res.render('user/new', {
          values: {
            pseudo: req.body['pseudo'],
            password: req.body['password'],
            name: req.body['name'],
          },
          failedFields: error.details
        })
      } else {
        next(error)
      }
    })
})

module.exports = router

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

router.get('/:id', function (req, res, next) {
    const userId = req.params.id
  
    userRepository.get(userId)
      .then((user) => {
        res.render('user/show', { user })
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


router.get('/:id/secrets/new', function (req, res, next) {
  const userId = req.params.id

  userRepository.get(userId)
    .then((user) => {
      res.render('secret/new', { user })
    })
    .catch(next)
})

router.post('/:id/secrets/new', function (req, res, next) {
  const userId = req.params.id

  const secretData = {
    title: req.body['description', 'content'],
    userId
  }
  return secretService.create(secretData)
    .then((secret) => {
      res.redirect(`/users/${secret.userId}/secrets`)
    })
    .catch((error) => {
      if (error instanceof Joi.ValidationError) {
        userRepository.get(userId)
          .then((user) => {
            res.render('secret/new', {
              author,
              values: {
                description: req.body['description'],
                content: req.body['content']
              },
              failedFields: error.details
            })
          })
      } else {
        next(error)
      }
    })
})

module.exports = router;

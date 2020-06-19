const router = require('express').Router()
const Joi = require('@hapi/joi')
const userRepository = require('../repositories/userRepository')
const { merge } = require('../app')
const { options } = require('@hapi/joi')
const commonService = require('../../test/services/commonservice')

router.get('/', function (req, res, next) {
  userRepository.listAll()
    .then((users) => {
      res.render('user/list', { users })
    })
    .catch(next)
})

router.get('/new',function(req,res,next){
  res.render('user/new')
})

router.post('/new',function(req,res,next) {
  const userData = {
    firstname: req.body['firstname'],
    lastname: req.body['lastname'],
    email: req.body['email']
  }
  return userRepository.create(userData)
  .then((user) => {res.redirect('/users')})
})

router.post('/login/:id', function(req, res, next){
    commonService.login(req, res)
    res.redirect('/users')
})



router.get('/:id', function (req, res, next) {
  const userId = req.params.id
  userRepository.get(userId)
    .then((users) => {
      res.render('user/show', { users })
    })
    .catch(next)
})

router.delete('/:id', function (req, res, next) {
  const userId = req.params.id

  userRepository.delete(userId)
    .then((_numberOfUserDeleted) => {
      res.status(204).send();
    })
    .catch(next)
})

module.exports = router
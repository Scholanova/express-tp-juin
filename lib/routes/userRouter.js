const router = require('express').Router()
const Joi = require('@hapi/joi')
const userRepository = require('../repositories/userRepository')

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
  console.log(userData)
  return userRepository.create(userData)
  .then((user) => {res.redirect('/users')})
})

module.exports = router
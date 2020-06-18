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

router.get('/',function(req,res,next){
  res.render('user/list')
})

module.exports = router
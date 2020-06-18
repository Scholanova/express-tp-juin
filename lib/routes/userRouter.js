const router = require('express').Router()
const Joi = require('@hapi/joi')

router.get('/', function (req, res, next) {
  authorRepository.listAll()
    .then((authors) => {
      res.render('user/list', { users })
    })
    .catch(next)
})

module.exports = router
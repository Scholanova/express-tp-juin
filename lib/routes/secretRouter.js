const userRepository = require('../repositories/userRepository')
const secretRepository = require('../repositories/secretRepository')
const router = require('express').Router()
const Joi = require('@hapi/joi')


router.get('/', function (req, res, next) {
    const userId = req.params.userId
    console.log(JSON.stringify(req.params));
    userRepository.get(userId)
        .then((user) => {
            return Promise.all([
                Promise.resolve(user),
                secretRepository.listForUser(user.id)
      ])
    })
    .then(([user, secrets]) => {
      res.render('secret/list', { user, secrets })
    })
    .catch(next)
})

module.exports = router;

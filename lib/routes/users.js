const userRepository = require('../repositories/userRepository')

const router = require('express').Router()

router.get('/', function(req, res, next) {
    userRepository.listAll()
        .then((users) => {
            res.render('user/list', { title: 'Users', users })
        })
        .catch(next)
})

module.exports = route
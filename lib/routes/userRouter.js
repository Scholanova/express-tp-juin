const userRepository = require('../repositories/userRepository')
const userService = require('../services/userService')
const router = require('express').Router()

var express = require('express');
var router = express.Router();

router.get('/:id', function (req, res, next) {
  const userId = req.params.id

  userRepository.get(userId)
    .then((user) => {
      res.render('users/show', { user })
    })
    .catch(next)
})
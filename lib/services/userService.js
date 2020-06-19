const { NotAValidAgeError,DogNotFoundError } = require('../errors')
const { ValidationError } = require('../errors')
const userRepository = require('../repositories/userRepository')
const models = require('../models')
const user = models.User

const userService = {
  create: (userData) => {
    return Promise.resolve(userData)
      .then(userRepository.create)
  }
}

module.exports = userService

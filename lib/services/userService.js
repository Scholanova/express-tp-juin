const Joi = require('@hapi/joi')
const userRepository = require('../repositories/userRepository')

const userService = {
  create: (userData) => {
    return Promise.resolve(userData)
      .then((userData) => {
        if (error) { throw error }
        return value
      })
      .then(userRepository.create)
  }
}

module.exports = userService
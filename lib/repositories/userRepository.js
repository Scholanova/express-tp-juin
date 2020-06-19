const { ResourceNotFoundError } = require('../errors')

const models = require('../models')
const User = models.User

const userRepository = {
  create: (userData) => {
    const user = new User(userData)
    return user.save()
  }
}

module.exports = userRepository

const { ResourceNotFoundError } = require('../errors')

const models = require('../models')
const User = models.User

const userRepository = {
  get: (id) => {
    return User.findOne({ where: { id } })
      .then((userResult) => {
        if (userResult === null) {
          throw new ResourceNotFoundError()
        }
        return userResult
      })
  },
  listAll: () => {
    return User.findAll()
  },
}

module.exports = userRepository

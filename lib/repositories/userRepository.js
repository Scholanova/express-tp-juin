const { ResourceNotFoundError } = require('../errors')

const models = require('../models')
const User = models.User

const userRepository = {
  create: (userData) => {
    const user = new User(userData)
    return user.save()
  },
  get: (id) => {
    return User.findOne({ where: { id } })
      .then((UserResult) => {
        if (UserResult === null) {
          throw new ResourceNotFoundError()
        }
        return UserResult
      })
  },
  listAll: () => {
    return User.findAll()
  },
  deleteById: (id) => {
    return User.findOne({ where: { id } })
      .then( (userResult) => {
        if (userResult === null) {
          throw new ResourceNotFoundError()
        }else {
          return userResult.destroy()
        }
      })
  }
}

module.exports = userRepository
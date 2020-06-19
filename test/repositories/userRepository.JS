const models = require('../models')
const User = models.User;

const userRepository = {
    create: (userData) => {
      const user = new User(userData)
      return user.save()
    },
    listAll: () => {
        return User.findAll()
    }
}

module.exports = userRepository 
const models = require('../lib/models')
const User = models.User

const factory = {
	createUserData: ({
    name = 'User X',
    email = 'userx@gmail.fr',
    password = 'userxpassword'
  } = {}) => {
    return { name, email, password }
  },
  createUser: ({
    id = 756,
    name = 'User X',
    email = 'userx@gmail.fr',
    password = 'userxpassword'
  } = {}) => {
    return new User({ id, name, email, password })
  },
}

module.exports = factory

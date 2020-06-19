const models = require('../lib/models')
const User = models.User

const factory = {
    createUserData: ({
        pseudo = 'pseudo',
        password = 'pseudo',
        name = 'djibril'
      } = {}) => {
        return { pseudo, password, name }
      },
      createUser: ({
        id = 756,
        pseudo = 'pseudo',
        password = 'pseudo',
        name = 'djibril'
      } = {}) => {
        return new User({ id, pseudo, password,name })
      }
}

module.exports = factory
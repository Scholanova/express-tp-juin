const models = require('../lib/models')
const User = models.User

const factory = {
    createUserData: ({
        pseudo = 'Namelistone',
        password = 'admin123',
        name = 'Benoit'
      } = {}) => {
        return { pseudo, password, name }
      },
      createUser: ({
        id = 756,
        pseudo = 'Namelistone',
        password = 'admin123',
        name = 'Benoit'
      } = {}) => {
        return new User({ id, pseudo, password,name })
      }
}

module.exports = factory

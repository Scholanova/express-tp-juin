const models = require('../lib/models')
const User = models.User

const factory = {
    createUserData: ({
        pseudo = 'Namelistone',
        password = 'admin123',
        nom = 'Benoit'
      } = {}) => {
        return { pseudo, password, nom }
      },
      createUser: ({
        id = 756,
        pseudo = 'Namelistone',
        password = 'admin123',
        nom = 'Benoit'
      } = {}) => {
        return new User({ id, pseudo, password,nom })
      }
}

module.exports = factory

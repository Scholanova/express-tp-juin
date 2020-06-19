const models = require('../lib/models')
const User = models.User
const Secret = models.Secret

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
      },
      createSecretData: ({
        description = "c un secret",
        content = "faut pas le dire",
        userId = 756
      } = {}) => {
        return { description, content, userId}
      },
      createSecret: ({
        id = 123,
        description = "c un secret",
        content = "faut pas le dire",
        userId = 756
      } = {}) => {
        return Secret({ userId, description, content })
      },
}

module.exports = factory

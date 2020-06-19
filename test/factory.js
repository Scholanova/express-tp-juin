const models = require('../lib/models')
const User = models.user


const factory = {
    createUserData: ({
        firstname = 'Jean',
        lastname = 'Polo',
        email = 'jp@test.ch'
      } = {}) => {
        return { firstname, lastname, email }
      },
      createUser: ({
        id = 756,
        firstname = 'Jean',
        lastname = 'Polo',
        email = 'jp@test.ch'
      } = {}) => {
        return new User({ id, firstname, lastname, email })
      },
}

module.exports = factory

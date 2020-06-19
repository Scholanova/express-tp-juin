const models = require('../lib/models')
const Users = models.Users


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
        return new Users({ id, firstname, lastname, email })
      },
}

module.exports = factory

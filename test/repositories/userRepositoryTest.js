const { expect, factory, sinon } = require('../testHelper')

const userRepository = require('../../lib/repositories/userRepository')
const models = require('../../lib/models')
const { ResourceNotFoundError } = require('../../lib/errors')
const User = models.User

describe('userRepository', () => {

  afterEach(async () => {
    await User.destroy({ where: {} })
  })

  describe('create', () => {

    let createdUser
    let retrievedUser
    let userData

    beforeEach(async () => {
      // given
      userData = factory.createUserData()

      // when
      createdUser = await userRepository.create(userData)
    })

    // then
    it('should return an user with the right properties', async () => {
      const createdUserValue = createdUser.get()

      expect(createdUserValue.pseudo).to.equal(userData.pseudo)
      expect(createdUserValue.password).to.equal(userData.password)
      expect(createdUserValue.nom).to.equal(userData.nom)

      retrievedUser = await userRepository.get(createdUser.id)
      const retrievedUserValue = retrievedUser.get()

      expect(createdUserValue).to.deep.equal(retrievedUserValue)
    })
  })
})

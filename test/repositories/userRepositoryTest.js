const { expect, factory } = require('../testHelper')

const userRepository = require('../../lib/repositories/userRepository')
const models = require('../../lib/models')
const User = models.User

describe('userRepository', () => {

  afterEach(async () => {
    await User.destroy({ where: {} })
  })

  describe('listAll', () => {
    let result

    context('when there is no users in the repository', () => {

      beforeEach(async () => {
        // given

        // when
        result = await userRepository.listAll()
      })

      it('should return an empty list', () => {
        // then
        expect(result).to.be.empty
      })
    })

    context('when there are two users in the repository', () => {

      let user1
      let user2

      beforeEach(async () => {
        // given
        const user1Data = factory.createUserData({
          name: 'User1',
          email: 'user1@gmail.fr',
          password: '123456'
        })
        const user2Data = factory.createUserData({
          name: 'User2',
          pseudo: 'Philip',
          email: 'user2@laposte.com',
          password: '654321'
        })
        user1 = await userRepository.create(user1Data)
        user2 = await userRepository.create(user2Data)

        // when
        result = await userRepository.listAll()
      })

      it('should return a list with the two users', () => {
        // then
        const user1Value = user1.get()
        const user2Value = user2.get()
        const resultValues = result.map((author) => author.get())

        expect(resultValues).to.deep.equal([user1Value, user2Value])
      })
    })
  })

})
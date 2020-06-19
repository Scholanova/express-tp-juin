const { expect, factory } = require('../testHelper')

const userRepository = require('../../lib/repositories/userRepository')
const models = require('../../lib/models')
const { ResourceNotFoundError } = require('../../lib/errors')
const User = models.User

describe('userRepository', () => {

  afterEach(async () => {
    await User.destroy({ where: {} })
  })

  describe('get', () => {
    let notExistingId
    let getUserPromise

    context('user does not exist', () => {
      beforeEach(async () => {
        // given
        notExistingId = 23456789

        // when
        getUserPromise = userRepository.get(notExistingId)
      })
      it('should throw a not found error', () => {
        // then
        return expect(getUserPromise).to.eventually.be.rejectedWith(ResourceNotFoundError)
      })
    })
  })
})
const Joi = require('@hapi/joi')
const { expect, request, sinon, factory } = require('../testHelper')
const { ResourceNotFoundError } = require('../../lib/errors')
const app = require('../../lib/app')
const userRepository = require('../../lib/repositories/userRepository')
const models = require('../../lib/models')
const Users = models.Users

describe('userRouter', () => {


  describe('show', () => {

    let userId
    let response

    beforeEach(() => {
      sinon.stub(userRepository, 'get')
    })

    context('when there is no user matching in the repository', () => {

      beforeEach(async () => {
        // given
        userId = '100001'
        userRepository.get.rejects(new ResourceNotFoundError())

        // when
        response = await request(app).get(`/user/${userId}`)
      })

      it('should call the user repository with id', () => {
        // then
        expect(userRepository.get).to.have.been.calledWith(userId)
        //expect(userRepository.get).to.not.been.called
      })

      

    })




  })


})

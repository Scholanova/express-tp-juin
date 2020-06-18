const Joi = require('@hapi/joi')
const { expect, request, sinon, factory } = require('../testHelper')
const { ResourceNotFoundError } = require('../../lib/errors')
const app = require('../../lib/app')
const userRepository = require('../../lib/repositories/userRepository')
const models = require('../../lib/models')
const Author = models.Author

describe('authorRouter', () => {


  describe('show', () => {

    let userId
    let response

    beforeEach(() => {
      sinon.stub(userRepository, 'get')
    })

    context('when there is no user matching in the repository', () => {

      beforeEach(async () => {
        // given
        userId = '123'
        userRepository.get.rejects(new ResourceNotFoundError())

        // when
        response = await request(app).get(`/user/${userId}`)
      })

      it('should call the user repository with id', () => {
        // then
        expect(userRepository.get).to.have.been.calledWith(userId)
      })

      it('should succeed with a status 404', () => {
        // then
        expect(response).to.have.status(404)
      })

      it('should return the resource not found page', () => {
        // then
        expect(response).to.be.html
        expect(response.text).to.contain('This page does not exist')
      })
    })




  })


})

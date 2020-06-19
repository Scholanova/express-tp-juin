const Joi = require('@hapi/joi')
const { expect, request, sinon, factory } = require('../testHelper')
const { ResourceNotFoundError } = require('../../lib/errors')
const app = require('../../lib/app')

const userRepository = require('../../lib/repositories/userRepository')
const userService = require('../../lib/services/userService')

const models = require('../../lib/models')
const User = models.User

describe('userRouter', () => {

    describe('Delete User - DELETE', () => {

        let response
    
        beforeEach(() => {
          sinon.stub(userRepository, 'delete')
          sinon.stub(userService, 'create')
        })
    
        context('when the user exist', () => {
    
          let userId, user
    
          beforeEach(async () => {
            // given
            userId = '213'
            user = factory.createUser({ id: userId })
            userService.create.resolves(user)
    
            userRepository.delete.resolves()
    
            // when
            response = await request(app)
            .delete(`/users/${userId}`)
            .redirects(0)
          })
    
          it('should call the repo delete with user id', () => {
            // then
            expect(userRepository.delete).to.have.been.calledWith(userId)
          })
    
          it('should succeed with a status 204', () => {
            // then
            expect(response).to.have.status(204)
          })
        })
      })
)}
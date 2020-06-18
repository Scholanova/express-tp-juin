const { expect, request, sinon, factory } = require('../testHelper')
const { ResourceNotFoundError } = require('../../lib/errors')
const app = require('../../lib/app')
const userRepository = require('../../lib/repositories/userRepository')
const models = require('../../lib/models')
const User = models.User

describe('userRouterDelete', () => {

  describe('delete', () => {

    let response

    beforeEach(() => {
      sinon.stub(userRepository, 'deleteById')
    })

    context('when the id exist in the database', () => {

        beforeEach(async () => {
        // given
        userId = '1000'
        userRepository.deleteById.resolves()
        
        // when
        response = await request(app).delete('/users/'+userId)
        })

        it('should call the user repository', () => {
            // then
            expect(userRepository.deleteById).to.have.been.calledWith(userId)
        })

        it('should succeed with a status 204', () => {
        // then
            expect(response).to.have.status(204)
            expect(response.text).to.be.empty
        })
    })
    
  }) 
})

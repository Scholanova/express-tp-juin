const Joi = require('@hapi/joi')
const { expect, request, sinon, factory } = require('../testHelper')
const { ResourceNotFoundError } = require('../../lib/errors')
const app = require('../../lib/app')
const userRepository = require('../../lib/repositories/userRepository')
const models = require('../../lib/models')
const User = models.User

describe('authorRouter', () => {
  
    describe('homePage', () => {

        beforeEach(() => {
            sinon.stub(userRepository, 'get')
        })

        let response

        context('when we are on the home page with no connection cookie', () => {
            
            beforeEach(async () => {
            
            // when
            response = await request(app).get('/')
            })
            
            it('should succeed with a status 200', () => {
            // then
            expect(response).to.have.status(200)
            })
            
            it('should return home page title', () => {
            // then
            expect(response).to.be.html
            expect(response.text).to.contain('Un message sympa')
            expect(response.text).to.contain('See users')
            })
        })

        context('when there is a user cookie', () => {

            let user
      
            beforeEach(async () => {
              // given
              userId = '123'
              user = ({
                  nom: 'Jean-Jacques Rousseau',
                  pseudo: 'Bonsoir',
              })
      
              userRepository.get.resolves(user)
      
              // when
              response = await request(app).get(`/`).set('Cookie', 'userId=123')
            })
      
            it('should call the user repository with id', () => {
              // then
              expect(userRepository.get).to.have.been.calledWith(userId)
            })
      
            it('should succeed with a status 200', () => {
              // then
              expect(response).to.have.status(200)
            })
      
            it('should return the show page with the user’s info', () => {
              // then
              expect(response).to.be.html
              expect(response.text).to.contain(user.nom)
            })
      
          })
    })
})
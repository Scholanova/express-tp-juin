const Joi = require('@hapi/joi')
const { expect, request, sinon, factory } = require('../testHelper')
const { ResourceNotFoundError } = require('../../lib/errors')
const app = require('../../lib/app')
const userRepository = require('../../lib/repositories/userRepository')
const userService = require('../../lib/services/userService')
const models = require('../../lib/models')
const User = models.User

describe('userRouterDelete', () => {

  describe('delete', () => {

    let response

    beforeEach(() => {
      sinon.stub(userRepository, 'deleteById')
    })

    context('when there is no users in the repository', () => {

      beforeEach(async () => {
        // given
        userRepository.listAll.resolves([])

        // when
        response = await request(app).get('/users')
      })

      it('should succeed with a status 200', () => {
        // then
        expect(response).to.have.status(200)
      })

      it('should return an empty list message', () => {
        // then
        expect(response).to.be.html
        expect(response.text).to.contain('No users in system yet.')
      })
    })

    context('when there are users in the repository', () => {

      let user
      beforeEach(async () => {
        // given
        user = ({
            name: 'Jean-Jacques Rousseau',
            password: 'pala',
            pseudo: 'Bonsoir',
        })

        userRepository.listAll.resolves([user])

        // when
        response = await request(app).get('/users')
      })

      it('should succeed with a status 200', () => {
        // then
        expect(response).to.have.status(200)
      })

      it('should return an html list with user info inside', () => {
        // then
        expect(response).to.be.html
        expect(response.text).to.contain(`${user.name} (${user.pseudo})`)
      })
    })

    context('when there are users in the repository', () => {

      let user
      beforeEach(async () => {
        // given
        user = ({
            name: 'Jean-Jacques Rousseau',
            password: 'pala',
            pseudo: 'Bonsoir',
        })
        userRepository.listAll.resolves([user])

        // when
        response = await request(app).get('/users')
      })

      it('should succeed with a status 200', () => {
        // then
        expect(response).to.have.status(200)
      })

      it('should return an html list with user info inside', () => {
        // then
        expect(response).to.be.html
        expect(response.text).to.contain(`${user.name}`)
      })
    })
  })
  
})

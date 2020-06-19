const Joi = require('@hapi/joi')
const { expect, request, sinon, factory } = require('../testHelper')
const { ResourceNotFoundError } = require('../../lib/errors')
const app = require('../../lib/app')
const userRepository = require('../../lib/repositories/userRepository')
const userService = require('../../lib/services/userService')
const models = require('../../lib/models')
const User = models.User

describe('UserRouter', () => {

  describe('new - POST', () => {

    let response

    beforeEach(() => {
      sinon.stub(userService, 'create')
    })

    context('when the user creation succeeds', () => {

      let user
      let userPseudo
      let userPassword
      let userName

      beforeEach(async () => {
        // given
        userPseudo = 'pseudo'
        userPassword = 'pseudo'
        userName = 'djibril'

        user = factory.createUser({
          pseudo: userPseudo,
          password: userPassword,
          name: userName,
        })
        userService.create.resolves(user)

        // when
        response = await request(app)
          .post('/users/new')
          .type('form')
          .send({ 'pseudo': userPseudo, 'password': userPassword, 'name': userName })
          .redirects(0)
      })

      it('should call the service with user data', () => {
        // then
        expect(userService.create).to.have.been.calledWith({
            pseudo: userPseudo,
            password: userPassword,
            name: userName,
        })
      })

      it('should succeed with a status 302', () => {
        // then
        expect(response).to.have.status(302)
      })

      it('should redirect to index page', () => {
        // then
        expect(response).to.redirectTo(`index`)
      })
    })

    context('when the user creation fails with validation errors', () => {

      let validationError
      let errorMessage
      let errorDetails

      let userPassword
      let userName

      beforeEach(async () => {
        // given
        errorDetails = [{
          message: '"pseudo" is required',
          path: ['pseudo'],
          type: 'any.required',
          context: { label: 'pseudo', key: 'pseudo' }
        }]
        errorMessage = '"pseudo" is required'
        validationError = new Joi.ValidationError(errorMessage, errorDetails, undefined)
        userService.create.rejects(validationError)

        userPassword = 'pseudo'
        userName = 'djibril'

        // when
        response = await request(app)
          .post('/users/new')
          .type('form')
          .send({ 'pseudo': undefined, 'password': userPassword, 'name': userName })
          .redirects(0)
      })

      it('should call the service with user data', () => {
        // then
        expect(userService.create).to.have.been.calledWith({
            'pseudo': undefined, 'password': userPassword, 'name': userName
        })
      })

      it('should succeed with a status 200', () => {
        // then
        expect(response).to.have.status(200)
      })

      it('should show new user page with error message and previous values', () => {
        // then
        expect(response).to.be.html
        expect(response.text).to.contain('New User')
        expect(response.text).to.contain('&#34;pseudo&#34; is required')
        expect(response.text).to.contain(userPassword)
        expect(response.text).to.contain(userName)
      })
    })
  })
})
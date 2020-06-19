const Joi = require('@hapi/joi')
const { expect, request, sinon, factory } = require('../testHelper')
const { ResourceNotFoundError } = require('../../lib/errors')
const app = require('../../lib/app')
const userRepository = require('../../lib/repositories/userRepository')
const userService = require('../../lib/services/userService')
const models = require('../../lib/models')
const User = models.User

describe('userRouter', () => {

  describe('list', () => {

    let response

    beforeEach(() => {
      sinon.stub(userRepository, 'listAll')
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
            nom: 'Jean-Jacques Rousseau',
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
        expect(response.text).to.contain(`${user.nom} (${user.pseudo})`)
      })
    })
  })
  
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
        userPseudo = 'Namelistone'
        userPassword = 'admin123'
        userName = 'Benoit'

        user = factory.createUser({
          pseudo: userPseudo,
          password: userPassword,
          nom: userName,
        })
        userService.create.resolves(user)

        // when
        response = await request(app)
          .post('/users/new')
          .type('form')
          .send({ 'pseudo': userPseudo, 'password': userPassword, 'nom': userName })
          .redirects(0)
      })

      it('should call the service with user data', () => {
        // then
        expect(userService.create).to.have.been.calledWith({
            pseudo: userPseudo,
            password: userPassword,
            nom: userName,
        })
      })

      it('should succeed with a status 302', () => {
        // then
        expect(response).to.have.status(302)
      })

      it('should redirect to index page', () => {
        // then
        expect(response).to.redirectTo("/")
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

        userPassword = 'admin123'
        userName = 'Benoit'

        // when
        response = await request(app)
          .post('/users/new')
          .type('form')
          .send({ 'pseudo': undefined, 'password': userPassword, 'nom': userName })
          .redirects(0)
      })

      it('should call the service with user data', () => {
        // then
        expect(userService.create).to.have.been.calledWith({
            'pseudo': undefined, 'password': userPassword, 'nom': userName
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
        response = await request(app).get(`/users/${userId}`)
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
        expect(response.text).to.contain('You have gone too deep')
      })
    })

    context('when there is a user matching in the repository', () => {

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
        response = await request(app).get(`/users/${userId}`)
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
        expect(response.text).to.contain(`Nom: ${user.nom}`)
        expect(response.text).to.contain(`Pseudo: ${user.pseudo}`)
      })

    })
    })

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
    describe('connexion - POST', () => {

      let response

      context('when connexion, cookie is set', () => {
  
        let userId
  
        beforeEach(async () => {
          // given
          userId = 1
    
          // when
          response = await request(app)
            .post('/users/connexion')
            .type('form')
            .send({ 'userId': userId })
            .redirects(0)
        })
  
        it('should set a cookie', () => {
          // then
          expect(response.headers["set-cookie"][0]).to.contain('userId=1')
        })
  
        it('should succeed with a status 302', () => {
          // then
          expect(response).to.have.status(302)
        })
  
        it('should redirect to index page', () => {
          // then
          expect(response).to.redirectTo("/")
        })
      })
  })

  describe('Deconnexion - GET', () => {

    let response

    context('when deconnexion, cookie is unset', () => {

      let userId

      beforeEach(async () => {
        // when
        response = await await request(app).get(`/users/deconnexion`).set('Cookie', 'userId=123').redirects(0)
      })

      it('should set a cookie', () => {
        // then
        expect(response.headers["set-cookie"][0]).to.not.contain('userId=123')
      })

      it('should succeed with a status 302', () => {
        // then
        expect(response).to.have.status(302)
      })

      it('should redirect to index page', () => {
        // then
        expect(response).to.redirectTo("/")
      })
    })
})
})

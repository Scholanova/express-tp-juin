const { expect, sinon, factory } = require('../testHelper')

const userService = require('../../lib/services/userService')
const userRepository = require('../../lib/repositories/userRepository')
const Joi = require('@hapi/joi')
const User = require('../../lib/models').User

describe('userService', () => {

  describe('create', () => {

    let userData
    let userCreationPromise

    beforeEach(() => {
      sinon.stub(userRepository, 'create')
    })

    context('when the user data is valid', () => {

      let user

      beforeEach(() => {
        // given
        userData = factory.createUserData()
        user = new User(userData)
        userRepository.create.resolves(user)

        // when
        userCreationPromise = userService.create(userData)
      })

      // then
      it('should call the user Repository with the creation data', async () => {
        // then
        await userCreationPromise.catch(() => {})
        expect(userRepository.create).to.have.been.calledWith(userData)
      })
      it('should resolve with the created user from reprository', () => {
        // then
        return expect(userCreationPromise).to.eventually.equal(user)
      })
    })

    context('when the user pseudo is missing', () => {

      beforeEach(() => {
        // given
        userData = factory.createUserData()
        userData.pseudo = undefined

        // when
        userCreationPromise = userService.create(userData)
      })

      it('should not call the user Repository', async () => {
        // then
        await userCreationPromise.catch(() => {})
        expect(userRepository.create).to.not.have.been.called
      })
      it('should reject with a ValidationError error about missing pseudo', () => {
        // then
        const expectedErrorDetails = [{
          message: '"pseudo" is required',
          path: ['pseudo'],
          type: 'any.required',
          context: { label: 'pseudo', key: 'pseudo' }
        }]

        return expect(userCreationPromise)
          .to.eventually.be.rejectedWith(Joi.ValidationError)
          .with.deep.property('details', expectedErrorDetails)
      })
    })

    context('when the user pseudo is empty', () => {

      beforeEach(() => {
        // given
        userData = factory.createUserData({ pseudo: '' })

        // when
        userCreationPromise = userService.create(userData)
      })

      it('should not call the user Repository', async () => {
        // then
        await userCreationPromise.catch(() => {})
        expect(userRepository.create).to.not.have.been.called
      })
      it('should reject with a ValidationError error about missing pseudo', () => {
        // then
        const expectedErrorDetails = [{
          message: '"pseudo" is not allowed to be empty',
          path: ['pseudo'],
          type: 'string.empty',
          context: { label: 'pseudo', key: 'pseudo', value: '' }
        }]

        return expect(userCreationPromise)
          .to.eventually.be.rejectedWith(Joi.ValidationError)
          .with.deep.property('details', expectedErrorDetails)
      })
    })

    context('when the user pseudo is to short', () => {

      beforeEach(() => {
        // given
        userData = factory.createUserData({ pseudo: 'toto' })

        // when
        userCreationPromise = userService.create(userData)
      })

      it('should not call the user Repository', async () => {
        // then
        await userCreationPromise.catch(() => {})
        expect(userRepository.create).to.not.have.been.called
      })
      it('should reject with a ValidationError error about pseudo being too short', () => {
        // then
        const expectedErrorDetails = [{
          message: '"pseudo" length must be at least 6 characters long',
          path: ['pseudo'],
          type: 'string.min',
          context: { label: 'pseudo', key: 'pseudo', value: 'toto', limit: 6, encoding: 'utf8' }
        }]
        return expect(userCreationPromise)
          .to.eventually.be.rejectedWith(Joi.ValidationError)
          .with.deep.property('details', expectedErrorDetails)
      })
    })
  })
})

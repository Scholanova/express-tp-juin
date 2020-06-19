const { expect, factory } = require('../testHelper')
const { SequelizeForeignKeyConstraintError } = require('sequelize')
const secretRepository = require('../../lib/repositories/secretRepository')
const userRepository = require('../../lib/repositories/userRepository')
const models = require('../../lib/models')
const { ResourceNotFoundError } = require('../../lib/errors')
const Secret = models.Secret

describe('secretRepository', () => {

    afterEach(async () => {
        await Secret.destroy({ where: {} })
    })

    describe('get', () => {

        let notExistingId
        let getSecretPromise
    
        context('secret does not exist', () => {
          beforeEach(async () => {
            // given
            notExistingId = 23456789
    
            // when
            getSecretPromise = secretRepository.get(notExistingId)
          })
    
          it('should throw a not found error', () => {
            // then
            return expect(getSecretPromise).to.eventually.be.rejectedWith(ResourceNotFoundError)
          })
        })
      })

    describe('create', () => {

        context('with a pre-existing user', () => {
            let createdSecret
            let retrievedSecret
            let secretData

            beforeEach(async () => {
                // given
                existingUser = await userRepository.create(factory.createUserData)
                secretData = factory.createSecretData({ userId: existingUser.id})

                // when
                createdSecret = await secretRepository.create(secretData)
            })

            // then
            it('should return a secret with the right properties', async () => {
                const createdSecretValue = createdSecret.get()

                expect(createdSecretValue.description).to.equal(secretData.description)
                expect(createdSecretValue.content).to.equal(secretData.content)

                retrievedSecret = await secretRepository.get(createdSecret.id)
                const retrievedSecretValue = retrievedSecret.get()

                expect(createdSecretValue).to.deep.equal(retrievedSecretValue)
            })
        })

        context('with no pre-existing user', () => {

            let createSecretPromise
            beforeEach(() => {
              // given
              const fakeuserId = 124256
              let secretData = factory.createSecretData({ userId: fakeuserId })
      
              // when
              createSecretPromise = secretRepository.create(secretData)
            })
      
            // then
            it('should return an constraint error', () => {
              return expect(createSecretPromise).to.eventually.be.rejectedWith(SequelizeForeignKeyConstraintError)
            })
        })
    })
})

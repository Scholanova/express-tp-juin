const { expect, sinon, factory } = require('../testHelper')

const secretService = require('../../lib/services/secretService')
const secretRepository = require('../../lib/repositories/secretRepository')
const Joi = require('@hapi/joi')
const Secret = require('../../lib/models').Secret

describe('secretService', () => {
  
  describe('create', () => {
    
    let secretData
    let secretCreationPromise
    
    beforeEach(() => {
      sinon.stub(secretRepository, 'create')
    })
    
    context('when the secret data are valid', () => {
      
      let secret
      
      beforeEach(() => {
        // given
        secretData = factory.createSecretData()
        secret = new Secret(secretData)
        secretRepository.create.resolves(secret)
        
        // when
        secretCreationPromise = secretService.create(secretData)
      })
      
      it('should call the secret Repository with the creation data', async () => {
        // then
        await secretCreationPromise.catch(() => {})
        expect(secretRepository.create).to.have.been.calledWith(secretData)
      })
      it('should resolve with the created secret from repository', () => {
        // then
        return expect(secretCreationPromise).to.eventually.equal(secret)
      })
    })
    
    context('when the secret description is missing', () => {
      
      beforeEach(() => {
        // given
        secretData = factory.createSecretData()
        secretData.description = undefined
        
        // when
        secretCreationPromise = secretService.create(secretData)
      })
      
      it('should not call the secret Repository', async () => {
        // then
        await secretCreationPromise.catch(() => {})
        expect(secretRepository.create).to.not.have.been.called
      })
      it('should reject with a ValidationError error about missing description', () => {
        // then
        const expectedErrorDetails = [{
          message: '"description" is required',
          path: ['description'],
          type: 'any.required',
          context: { label: 'description', key: 'description' }
        }]
        
        return expect(secretCreationPromise)
        .to.eventually.be.rejectedWith(Joi.ValidationError)
        .with.deep.property('details', expectedErrorDetails)
      })
    })

    context('when the secret description as more than 100 characters', () => {
      
        beforeEach(() => {
          // given
          secretData = factory.createSecretData()
          secretData.description = 
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac mauris vitae mauris dictum rhoncus orci."
          
          // when
          secretCreationPromise = secretService.create(secretData)
        })
        
        it('should not call the secret Repository', async () => {
          // then
          await secretCreationPromise.catch(() => {})
          expect(secretRepository.create).to.not.have.been.called
        })
        it('should reject with a ValidationError error about too big description', () => {
            // then
            const expectedErrorDetails = [{
                context: {
                encoding: undefined,
                key: "description",
                label: "description",
                limit: 100,
                value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac mauris vitae mauris dictum rhoncus orci."
                },
                message: "\"description\" length must be less than or equal to 100 characters long",
                path: ["description"],
                type: "string.max"
            }]
          
          return expect(secretCreationPromise)
          .to.eventually.be.rejectedWith(Joi.ValidationError)
          .with.deep.property('details', expectedErrorDetails)
        })
    })

    context('when the secret content is missing', () => {
      
        beforeEach(() => {
          // given
          secretData = factory.createSecretData()
          secretData.content = undefined
          
          // when
          secretCreationPromise = secretService.create(secretData)
        })
        
        it('should not call the secret Repository', async () => {
          // then
          await secretCreationPromise.catch(() => {})
          expect(secretRepository.create).to.not.have.been.called
        })
        it('should reject with a ValidationError error about missing description', () => {
          // then
          const expectedErrorDetails = [{
            message: '"content" is required',
            path: ['content'],
            type: 'any.required',
            context: { label: 'content', key: 'content' }
          }]
          
          return expect(secretCreationPromise)
          .to.eventually.be.rejectedWith(Joi.ValidationError)
          .with.deep.property('details', expectedErrorDetails)
        })
    })

    
    context('when the user id is missing', () => {
      
      beforeEach(() => {
        // given
        secretData = factory.createSecretData()
        secretData.userId = undefined
        
        // when
        secretCreationPromise = secretService.create(secretData)
      })
      
      it('should not call the secret Repository', async () => {
        // then
        await secretCreationPromise.catch(() => {})
        expect(secretRepository.create).to.not.have.been.called
      })
      it('should reject with a ValidationError error about missing userId', () => {
        // then
        const expectedErrorDetails = [{
          message: '"userId" is required',
          path: ['userId'],
          type: 'any.required',
          context: { label: 'userId', key: 'userId' }
        }]
        
        return expect(secretCreationPromise)
        .to.eventually.be.rejectedWith(Joi.ValidationError)
        .with.deep.property('details', expectedErrorDetails)
      })
    })
  })
})
    
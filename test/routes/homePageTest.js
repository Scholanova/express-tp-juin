const Joi = require('@hapi/joi')
const { expect, request, sinon, factory } = require('../testHelper')
const { ResourceNotFoundError } = require('../../lib/errors')
const app = require('../../lib/app')

describe('authorRouter', () => {
  
    describe('homePage', () => {

        let response

        context('when we are on the home page', () => {
            
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
            })
        })
    })
})
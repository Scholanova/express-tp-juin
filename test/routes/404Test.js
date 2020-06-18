const { expect, request, sinon, factory } = require('../testHelper')
const { ResourceNotFoundError } = require('../../lib/errors')
const app = require('../../lib/app')

describe('404RouterTest', () => {

  describe('accesRoute', () => {
    let routeToTest


    context('when there is no authors in the repository', () => {


      beforeEach(async () => {
        // given
        let unknowRoute ="/UnknowRoute"
        routeToTest = unknowRoute
        // when
        response = await request(app).get(routeToTest)
      })

      it('should fail with a status 404', () => {
        // then
       // expect(response).to.have.status(404)
      })

      it('should return an error page', () => {
        // then
        expect(response).to.be.html
        expect(response.text).to.contain('You have gone too deep.')
      })
    })
  })



}) 
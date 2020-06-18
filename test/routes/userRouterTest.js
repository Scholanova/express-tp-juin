describe('userRouter', () => {
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
        expect(response.text).to.contain('This page does not exist')
      })
    })

    context('when there is a user matching in the repository', () => {

      let user

      beforeEach(async () => {
        // given
        userId = '123'
        user = factory.createUser({ id: userId })

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
        expect(response.text).to.contain(`Utilisateur ${user.name}`)
        expect(response.text).to.contain(`Email: ${user.email}`)
      })
    })
  })
})
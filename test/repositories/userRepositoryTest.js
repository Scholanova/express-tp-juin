const { expect, factory } = require('../testHelper')

const userRepository = require('../../lib/repositories/userRepository')
const models = require('../../lib/models')
const { ResourceNotFoundError } = require('../../lib/errors')
const User = models.User

describe('userRepository', () => {

  afterEach(async () => {
    await User.destroy({ where: {} })
  })

  describe('create', () => {

    let createdUser
    let retrievedUser
    let userData

    beforeEach(async () => {
      // given
      userData = factory.createUserData()

      // when
      createdUser = await userRepository.create(userData)
    })

    // then
    it('should return an user with the right properties', async () => {
      const createdUserValue = createdUser.get()

      expect(createdUserValue.pseudo).to.equal(userData.pseudo)
      expect(createdUserValue.password).to.equal(userData.password)
      expect(createdUserValue.nom).to.equal(userData.nom)

      retrievedUser = await userRepository.get(createdUser.id)
      const retrievedUserValue = retrievedUser.get()

      expect(createdUserValue).to.deep.equal(retrievedUserValue)
    })
  })


      
    describe('get', () => {

        let notExistingId
        let getUserPromise
    
        context('user does not exist', () => {
          beforeEach(async () => {
            // given
            notExistingId = 23456789
    
            // when
            getUserPromise = userRepository.get(notExistingId)
          })
    
          it('should throw a not found error', () => {
            // then
            return expect(getUserPromise).to.eventually.be.rejectedWith(ResourceNotFoundError)
          })
        })
      })
  
    describe('listAll', () => {
        let result

        context('when there is no users in the repository', () => {

            beforeEach(async () => {
                // given

                // when
                result = await userRepository.listAll()
            })

            it('should return an empty list', () => {
                // then
                expect(result).to.be.empty
            })
        })

        context('when there are two users in the repository', () => {

        let user1
        let user2

        beforeEach(async () => {
            // given
            const userData = ({
                name: 'Jean-Jacques Rousseau',
                password: 'pala',
                pseudo: 'Bonsoir',
            })
            const user2Data = ({
                name: 'Yves',
                password: 'poupou',
                pseudo: 'Gne',
            })
            user1 = await userRepository.create(userData)
            user2 = await userRepository.create(user2Data)

            // when
            result = await userRepository.listAll()
        })

        it('should return a list with the two users', () => {
            // then
            const user1Value = user1.get()
            const user2Value = user2.get()
            const resultValues = result.map((user) => user.get())

            expect(resultValues).to.deep.equal([user1Value, user2Value])
        })
        })
    })

    describe('delete', () => {

      let existingUser
      let resultPromise
  
      beforeEach(async () => {
        // given
        const userData = factory.createUserData("LALALA","123","CYRYL")
        existingUser = await userRepository.create(userData)
        
        // when
        resultPromise = userRepository.deleteById(existingUser.id)
      })
  
      // then
      it('should succeed', () => {
        const numberOfDelete = 1
        return expect(resultPromise).to.eventually.equal(numberOfDelete)
      })
  
      it('should delete the user', () => {
        const getUserPromise = userRepository.get(existingUser.id)
  
        return expect(getUserPromise).to.eventually.be.rejectedWith(ResourceNotFoundError)
      })
    })

})

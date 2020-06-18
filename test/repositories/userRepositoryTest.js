const { expect, factory } = require('../testHelper')

const userRepository = require('../../lib/repositories/userRepository')
const models = require('../../lib/models')
const { ResourceNotFoundError } = require('../../lib/errors')
const User = models.User

describe('userRepository', () => {

    afterEach(async () => {
      await User.destroy({ where: {} })
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

        context.skip('when there are two users in the repository', () => {

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

})
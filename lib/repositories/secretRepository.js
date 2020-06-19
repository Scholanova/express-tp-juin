const { ResourceNotFoundError } = require('../errors')

const models = require('../models')
const Secret = models.Secret

const secretRepository = {
    get: (id) => {
        return Secret.findOne({ where: { id } })
            .then((secretResult) => {
            if (secretResult === null) {
                throw new ResourceNotFoundError()
            }
            return secretResult
            })
        },
}

module.exports = secretRepository

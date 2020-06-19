const { ResourceNotFoundError } = require('../errors')

const models = require('../models')
const Secret = models.Secret

const secretRepository = {
  create: (secretData) => {
    const secret = new Secret(secretData)
    return secret.save()
  },
  get: (id) => {
    return Secret.findOne({ where: { id } })
      .then((SecretResult) => {
        if (SecretResult === null) {
          throw new ResourceNotFoundError()
        }
        return SecretResult
      })
  },
}

module.exports = secretRepository

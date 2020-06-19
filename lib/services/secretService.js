const Joi = require('@hapi/joi')
const secretRepository = require('../repositories/secretRepository')

const secretSchema = Joi.object({
  userId: Joi.number().required(),
  description: Joi.string().max(100).required(),
  content: Joi.string().required()
})


const secretService = {
  create: (secretData) => {
    return Promise.resolve(secretData)
      .then((secretData) => {
        const { value, error } = secretSchema.validate(secretData, { abortEarly: false })
        if (error) { throw error }
        return value
      })
      .then(secretRepository.create)
  }
}


module.exports = secretService

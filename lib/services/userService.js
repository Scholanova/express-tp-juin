const Joi = require('@hapi/joi')
const userRepository = require('../repositories/userRepository')

const userSchema = Joi.object({
  name: Joi.string().min(4, 'utf8').required(),
  email: Joi.string(),
  password: Joi.string().email().required()
})

const userService = {
  create: (userData) => {
    return Promise.resolve(authorData)
      .then((userData) => {
        const { value, error } = userSchema.validate(userData, { abortEarly: false })

        if (error) { throw error }
        return value
      })
      .then(userRepository.create)
  }
}

module.exports = userService
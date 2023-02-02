const users = require('../database/users.json')
const Joi = require('joi')
const { sign } = require('jsonwebtoken')

module.exports.login = async event => {
  try {
    const user = JSON.parse(event.body)

    const { username, password } = await Joi.object({
      username: Joi.string().min(3).required(),
      password: Joi.string().min(3).required()
    }).validateAsync(user, { abortEarly: false })

    const authUser = users.find(
      user =>
        user.username.toLocaleLowerCase() === username.toLocaleLowerCase() &&
        user.password === password

    )

    if (!authUser) {
      throw new Error('User not found')
    }

    const token = sign({
      user: authUser
    }, process.env.JWT_KEY, { expiresIn: '5m' })

    return {
      statusCode: 200,
      body: JSON.stringify({
        token
      })
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: error.message
      })
    }
  }
}

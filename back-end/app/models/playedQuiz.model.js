const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('PlayedQuiz', {
  name: Joi.string().required(),
  quizId: Joi.number().required(),
  score: Joi.number().required(),
  userId: Joi.number().required(),
  date: Joi.date(),
})

const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('PlayedQuiz', {
  quizId: Joi.string().required(),
  questions: Joi.array().required(),
  currentQuestion: Joi.string().required(),
  beginningDate: Joi.date(),
  user: Joi.string(),
})

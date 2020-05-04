const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Quiz', {
    theme: Joi.string().required(),
    user: Joi.string().allow(''),
    name: Joi.string().required(),
    questions: Joi.array(),
    date: Joi.date(),
    image: Joi.string().allow(''),
})

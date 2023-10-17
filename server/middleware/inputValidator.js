const joi = require('joi');
const postModel = require('../models/postModel');


const postValidator = joi.object({
    headline: joi.string()
        .min(5)
        .max(100)
        .required(),

    description: joi.string()
        .min(10)
        .max(600),

    body: joi.string(),

    tag: joi.string()
        .valid('news', 'article')
        .default('news')
}).options({ abortEarly: false })



const validatePostMiddleware = async (req, res, next) => {
    const postPlayload = req.body

    try {
        await postValidator.validateAsync(postPlayload)
        next()
    } catch (error) {
        // console.log(error)
        next(error)
    }
}


module.exports = { validatePostMiddleware }
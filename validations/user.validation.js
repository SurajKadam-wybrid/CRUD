const joi = require('joi');

const registerSchema = joi.object({
    name: joi.string().min(3).max(300).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
})

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
})

const updateSchema = joi.object({
    name: joi.string().min(3).max(300),
    email: joi.string().email(),
    password: joi.string().min(6)
    
});

module.exports = {registerSchema,loginSchema,updateSchema};
const Joi = require("joi")

const registerSchema = Joi.object({
    email: Joi.string().min(4).max(30).required(),
    full_name: Joi.string().min(1).max(255).required(),
    password: Joi.string().required().min(8).max(30),
})

const registrationValidation = (data => {
    return registerSchema.validate(data);
})

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

const loginValidation = (data => {
    return loginSchema.validate(data);
})

const groupSchema = Joi.object({
    groupName: Joi.string().required().min(3).max(100),
    courses: Joi.array().items(Joi.string().uri()).unique()
})

const groupValidation = data => {
    return groupSchema.validate(data)
}

module.exports = {
    registrationValidation: registrationValidation,
    loginValidation: loginValidation,
    groupValidation: groupValidation
}
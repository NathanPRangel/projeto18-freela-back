import joi from 'joi'

export const userSchema = joi.object({
    name: joi.string().min(3).required(),
    cpf: joi.string().regex(/^\d{11}$/).required(),
    phone: joi.string().regex(/^\d{10,11}$/).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required()
})

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})


import Joi from 'joi';

export const signInValidation = Joi.object({
    fullname: Joi.string().required().min(5).trim(),
    email: Joi.string().email().required(),
    password: Joi.string().trim().min(8).required()
});

export const logInValidation = Joi.object({
    email: Joi.string().trim().email().required(), 
    password: Joi.string().min(8).required() 
});
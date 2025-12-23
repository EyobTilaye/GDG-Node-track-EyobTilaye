import Joi from "joi";


export const userSchema = Joi.object({
    title: Joi.string().required(),
    price: Joi.number().min(0).required()
});
import Joi from "joi";

export const cartSchema = Joi.object({
    item: Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
    }),
    userId: Joi.string().required(),
});
export const updateCartSchema = Joi.object({
    item: Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).optional(),
    }),
    userId: Joi.string().required(),
});
export const deleteFromCartSchema = Joi.object({
    userId: Joi.string().required(),
});

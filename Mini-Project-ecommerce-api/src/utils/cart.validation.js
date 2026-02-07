import Joi from "joi";

export const cartSchemaValidator = Joi.object({
    item: Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
    }),
    userId: Joi.string().required(),
});
export const updateCartSchemaValidator = Joi.object({
    item: Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).optional(),
    }),
    userId: Joi.string().required(),
});
export const deleteFromCartSchemaValidator = Joi.object({
    userId: Joi.string().required(),
});

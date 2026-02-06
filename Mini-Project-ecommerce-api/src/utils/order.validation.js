import Joi from "joi";

export const orderSchema = Joi.object({
    userId: Joi.string().required(),
});

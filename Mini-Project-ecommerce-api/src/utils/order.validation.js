import Joi from "joi";

export const orderSchemaValidator = Joi.object({
    userId: Joi.string().required(),
});

import Joi from "joi";

export const productSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    price: Joi.number().required().positive(),
    stock: Joi.number().required().min(0),
    description: Joi.string().min(10).max(100).required(),
    category: Joi.string()
        .valid("electronics", "clothing", "jewelery", "others")
        .required(),
    imageUrl: Joi.string().uri().allow("").optional(),
});
export const updateProductSchema = Joi.object({
    name: Joi.string().min(3).max(50).optional(),
    price: Joi.number().optional().positive(),
    stock: Joi.number().optional().min(0),
    description: Joi.string().min(10).max(100).optional(),
    category: Joi.string()
        .valid("electronics", "clothing", "jewelery", "others")
        .optional(),
    imageUrl: Joi.string().uri().optional(),
});

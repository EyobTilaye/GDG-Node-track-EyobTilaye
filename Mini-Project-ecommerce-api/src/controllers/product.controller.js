import {
    productSchemaValidator,
    updateProductSchemaValidator,
} from "../utils/product.validation.js";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res, next) => {
    try {
        const { category, minPrice, maxPrice } = req.query;

        if (!category && !minPrice && !maxPrice) {
            const products = await Product.find();
            return res.status(200).json({
                data: products,
            });
        }
        const filter = {};
        if (category) {
            filter.category = category;
        }
        filter.price = {};
        if (minPrice) {
            filter.price.$gte = minPrice;
        }
        if (maxPrice) {
            filter.price.$lte = maxPrice;
        }
        const products = await Product.find(filter);

        if (!products) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json({
            data: products,
        });
    } catch (error) {
        next(error);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ data: product });
    } catch (error) {
        next(error);
    }
};

export const createProduct = async (req, res, next) => {
    try {
        const { error } = productSchemaValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const newProduct = new Product(req.body);
        const savedNewProduct = await newProduct.save();
        res.status(201).json({
            product: savedNewProduct,
            message: "Product successfully created.",
        });
    } catch (error) {
        next(error);
    }
};
export const updateProduct = async (req, res, next) => {
    const { error } = updateProductSchemaValidator.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({
            product: updatedProduct,
            message: "Product successfully updated.",
        });
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product successfully deleted." });
    } catch (error) {
        next(error);
    }
};

/*
{
  "name": "washing machine",
  "price": 20,
  "description": "best energy saving washing machine",
  "stock": 5,
  "category": "electronics",
  "imageUrl": "https://www.shutterstock.com/search/washing-machine-top-load",
  "_id": "6984413d2e4852f28508e0af",
  "__v": 0
}

*/

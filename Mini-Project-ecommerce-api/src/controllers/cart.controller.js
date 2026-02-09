import mongoose from "mongoose";
import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";
import User from "../models/user.model.js";
import {
    cartSchemaValidator,
    updateCartSchemaValidator,
    deleteFromCartSchemaValidator,
} from "../utils/cart.validation.js";

export const addToCart = async (req, res, next) => {
    try {
        const { error } = cartSchemaValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { userId, item } = req.body;
        const { productId, quantity } = item;
        const product = await Product.findById(productId);
        const user = await User.findById(userId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (product.stock < quantity) {
            console.log("Available stock:", product.stock);
            return res
                .status(400)
                .json({ message: "Insufficient avaliable stock level" });
        }
        //to check whether the use created a cart before or not
        let cart = await Cart.findOne({ userId }).populate("items.productId");
        if (!cart) {
            cart = await Cart.create({
                userId,
                items: [],
            });
        }
        // this checks if the product is already in the cart or not
        const existingProductIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId,
        );
        if (existingProductIndex !== -1) {
            cart.items[existingProductIndex].quantity += quantity;
        } else {
            cart.items.push({ productId: productId, quantity: quantity });
        }
        await cart.save();
        res.status(201).json({
            message: "Product added to cart successfully",
            data: cart,
            productName: product.name,
        });
    } catch (error) {
        next(error);
    }
};

export const viewCurrentCart = async (req, res, next) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const cart = await Cart.findOne({
            userId: new mongoose.Types.ObjectId(userId),
        });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json({ data: cart });
    } catch (error) {
        next(error);
    }
};

export const updateCart = async (req, res, next) => {
    try {
        const { error } = updateCartSchemaValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { userId, item } = req.body;
        const { productId, quantity } = item;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        let itemLength = cart.items.length;
        let itemFound = false;

        for (let i = 0; i < itemLength; i++) {
            if (cart.items[i].productId.toString() === productId) {
                cart.items[i].quantity = quantity;
                itemFound = true;
                break;
            }
        }

        if (!itemFound) {
            return res
                .status(404)
                .json({ message: "Product not found in the cart" });
        }

        // when the item found in the cart then we need to check whether the new quantity is less than or equal to the available stock
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (product.stock < quantity) {
            return res
                .status(400)
                .json({ message: "Insufficient available stock level" });
        }
        // the new found and quanitity is valid we can save the updated value to the database
        await cart.save();
        res.status(200).json({
            message: "Cart updated successfully",
            data: cart,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteFromCart = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const { error } = deleteFromCartSchemaValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { userId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        console.log("Product ID to delete:", productId);
        console.log("Current cart items:", cart.items);
        const itemIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId,
        );
        if (itemIndex === -1) {
            return res
                .status(404)
                .json({ message: "Product not found in the cart" });
        }
        cart.items.splice(itemIndex, 1);
        await cart.save();
        res.status(200).json({
            message: "Product deleted from cart successfully",
            data: cart,
        });
    } catch (error) {
        next(error);
    }
};

import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Cart from "../models/cart.model.js";
import { orderSchemaValidator } from "../utils/order.validation.js";

export const createOrder = async (req, res, next) => {
    try {
        const { error } = orderSchemaValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { userId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        let cart = await Cart.findOne({ userId }).populate("items.productId");
        if (!cart || cart.items.length === 0) {
            return res.status(404).json({ message: "Empty cart" });
        }
        // check if the stock is sufficient for each item in the cart to be ordered
        for (let i = 0; i < cart.items.length; i++) {
            if (cart.items[i].quantity > cart.items[i].productId.stock) {
                return res.status(400).json({
                    message: `Insufficient stock for product ${cart.items[i].productId.name}`,
                });
            }
        }

        // mapping every item from the cart to the order
        const orderItems = cart.items.map((item) => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price,
        }));

        let total = 0;
        //calculate total price
        orderItems.forEach((item) => {
            total += item.price * item.quantity;
        });

        //remove from the product stoke
        for (let i = 0; i < orderItems.length; i++) {
            cart.items[i].productId.stock -= cart.items[i].quantity;
            await cart.items[i].productId.save();
        }

        // create the full object of the order
        const order = await Order.create({
            userId: userId,
            items: orderItems,
            total: total,
            customerInfo: {
                name: user.name,
            },
            orderDate: new Date(),
        });

        // clear the items from the cart
        cart.items = [];
        await cart.save();

        return res
            .status(201)
            .json({ message: "Order created successfully", data: order });
    } catch (error) {
        next(error);
    }
};

export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find();
        if (!orders) {
            return res.status(404).json({ message: "No orders found" });
        }
        res.status(200).json({ data: orders });
    } catch (error) {
        next(error);
    }
};

export const viewOrderDetailsById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id).populate("items.productId");
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({ data: order });
    } catch (error) {
        next(error);
    }
};

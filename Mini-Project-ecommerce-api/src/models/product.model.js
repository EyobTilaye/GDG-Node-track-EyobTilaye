import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    description: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        required: true,
        enum: ["electronics", "clothing", "jewelery", "others"],
    },
    imageUrl: {
        type: String,
        default: "",
    },
});

const Product = mongoose.model("Product", productSchema);
export default Product;

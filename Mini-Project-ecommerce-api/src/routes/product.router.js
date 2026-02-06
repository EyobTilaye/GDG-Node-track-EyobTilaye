import { Router } from "express";
import {
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    createProduct,
} from "../controllers/product.controller.js";

const productRoutes = Router();

// Get all products filter by category, minPrice and maxPrice
productRoutes.get("/", getAllProducts);

// get product by id
productRoutes.get("/:id", getProductById);

//create new product
productRoutes.post("/", createProduct);

// update existing product
productRoutes.put("/:id", updateProduct);
// delete existing product
productRoutes.delete("/:id", deleteProduct);

export default productRoutes;

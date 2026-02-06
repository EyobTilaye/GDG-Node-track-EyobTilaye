import { Router } from "express";
import {
    viewCurrentCart,
    addToCart,
    updateCart,
    deleteFromCart,
} from "../controllers/cart.controller.js";

const cartRoutes = Router();

cartRoutes.get("/", viewCurrentCart);

cartRoutes.post("/", addToCart);

cartRoutes.put("/", updateCart);

cartRoutes.delete("/:productId", deleteFromCart);

export default cartRoutes;

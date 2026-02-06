import { Router } from "express";
import {
    createOrder,
    getAllOrders,
    viewOrderDetailsById,
} from "../controllers/order.controller.js";

const orderRoutes = Router();

orderRoutes.post("/", createOrder);

orderRoutes.get("/", getAllOrders);

orderRoutes.get("/:id", viewOrderDetailsById);

export default orderRoutes;

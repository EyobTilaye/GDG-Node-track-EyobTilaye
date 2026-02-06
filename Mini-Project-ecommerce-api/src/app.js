import express from "express";
import connectDatabase from "./config/database.js";
import productRoutes from "./routes/product.router.js";
import cartRoutes from "./routes/cart.router.js";
import orderRoutes from "./routes/order.router.js";
import userRoutes from "./routes/user.router.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

//connect to database
connectDatabase();

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

app.use("/products", productRoutes);

app.use("/carts", cartRoutes);

app.use("/orders", orderRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

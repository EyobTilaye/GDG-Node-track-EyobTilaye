import express from "express";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

//Middleware
app.use(express.json());

//Routes
app.use("/users", userRoutes);

//error handling
app.use(errorHandler);

export default app;

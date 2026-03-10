import cookieParser from "cookie-parser";
import express from "express";
import authenticationRoutes from "./routes/auth.routes.js";
import { errorHandler ,notFoundHandler } from "./middlewares/error.middleware.js";
import { authorize } from "./middlewares/auth.middleware.js";
import {getDashboard} from "./controllers/dashboard.controllers.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/", authenticationRoutes);
app.get("/api/v1/dashboard",authorize,getDashboard)


app.use(notFoundHandler);
app.use(errorHandler);

export default app;

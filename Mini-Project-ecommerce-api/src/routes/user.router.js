import { Router } from "express";
import { createUser, loginUser } from "../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.post("/login", loginUser);

userRoutes.post("/register", createUser);

export default userRoutes;

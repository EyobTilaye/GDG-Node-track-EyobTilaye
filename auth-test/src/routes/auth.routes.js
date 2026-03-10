import { Router } from "express";
import { login, signUp ,signOut} from "../controllers/auth.controller.js";

const authenticationRoutes = Router();

authenticationRoutes.post("/sign-up", signUp);
authenticationRoutes.post("/log-in", login);
authenticationRoutes.post("/log-in", signOut);

export default authenticationRoutes;

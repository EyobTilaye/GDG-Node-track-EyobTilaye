import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export const authorize = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized",
            });
        }
        const payload = jwt.verify(token, JWT_SECRET);
        console.log(payload);

        req.userId = payload.userId;
        
        next();
    } catch (error) {
        next(error);
    }
};

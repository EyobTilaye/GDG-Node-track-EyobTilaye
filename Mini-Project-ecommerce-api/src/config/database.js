import mongoose from "mongoose";
import { DATABASE_URL } from "./env.js";

const connectDatabase = async () => {
    try {
        if (!DATABASE_URL) {
            throw new Error(
                "DATABASE_URL is not defined in environment variables",
            );
        }
        await mongoose.connect(DATABASE_URL);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
};

export default connectDatabase;

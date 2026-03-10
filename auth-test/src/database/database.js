import { MONGODB_URI } from "../config/env.js";
import mongoose from "mongoose";

const connectDataBase = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("DB connected");
    } catch (error) {
        console.log("database connection error");
        console.log(error);
    }
};

export default connectDataBase;

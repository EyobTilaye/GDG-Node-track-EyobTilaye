import User from "../models/user.model.js";
import userSchema from "../utils/user.validation.js";

export const createUser = async (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    const { name } = req.body;
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const existedUser = await User.findOne({ name });
    if (existedUser) {
        return res.status(400).json({ message: "User already exists" });
    }
    try {
        const newUser = new User(req.body);
        const savedNewUser = await newUser.save();
        res.status(201).json({
            user: savedNewUser,
            message: "User successfully created.",
        });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    const { name } = req.body;
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    try {
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            user: user,
            message: "User successfully logged in.",
        });
    } catch (error) {
        next(error);
    }
};

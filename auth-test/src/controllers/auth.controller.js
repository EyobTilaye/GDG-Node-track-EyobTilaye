import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signInValidation, logInValidation } from "../utils/auth.validation.js";
import {
  JWT_EXPIRES_IN,
  JWT_SECRET,
  JWT_COOKIE_EXPIRES_IN,
} from "../config/env.js";

export const signUp = async (req, res, next) => {
  try {
    const { error } = signInValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const { fullname, email, password } = req.body;
    const existedUser = await User.findOne({ email: email });
    if (existedUser) {
      throw new Error("User already existed by this email");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname: fullname,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    newUser.password = undefined;

    res.status(200).json({
      success: true,
      data: {
        newUser,
      },
      message: "User successfully registered",
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { error } = logInValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Invalid credential");
      error.status = 401;
      throw error;
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credential",
      });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
    });
    return res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    const token = req.cookie?.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token missing",
      });
    }
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
    });
    res.status(200).json({
      success: true,
      message: "logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

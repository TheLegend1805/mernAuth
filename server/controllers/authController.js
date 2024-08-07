import User from "../models/userModel.js";
import bcrytjs from "bcryptjs";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashPassword = bcrytjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created!" });
  } catch (error) {
    next(error);
  }
};
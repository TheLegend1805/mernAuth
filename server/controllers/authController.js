import User from "../models/userModel.js";
import bcrytjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All Fields required" });
  }
  const hashPassword = bcrytjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created!" });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All Fields required" });
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User Not found"));
    }

    const validPassword = bcrytjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(401, "Invalid Credentials"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashPassword, ...rest } = validUser._doc;
    // ._doc property contains the raw data of the document as a plain JavaScript object.

    const cookieExpiry = new Date(Date.now() + 3600000);
    //add cookie expiry for 1hr. accesstoken will be same for 1hr.
    res
      .cookie("accesstoken", token, { httpOnly: true, expires: cookieExpiry })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

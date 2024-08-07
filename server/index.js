import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`server on http://localhost:${process.env.PORT}`);
});

app.use("/api/user/", userRoutes);
app.use("/api/auth/", authRoutes);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const msg = error.msg || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    msg,
    statusCode,
  });
});

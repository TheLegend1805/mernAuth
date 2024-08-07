import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

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

app.listen(process.env.PORT, () => {
  console.log(`server on http://localhost:${process.env.PORT}`);
});

app.use("/api/user/", userRoutes);

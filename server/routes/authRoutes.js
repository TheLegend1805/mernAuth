import express from "express";
import { signUp } from "../controllers/authController.js";

const router = express.Router();

const app = express.Router();

router.post("/signup", signUp);

export default router;

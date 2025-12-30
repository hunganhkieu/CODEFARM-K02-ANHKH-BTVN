import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";

const authRoutes = Router();

authRoutes.post("/register", signUp);
authRoutes.post("/login", signIn);
export default authRoutes;

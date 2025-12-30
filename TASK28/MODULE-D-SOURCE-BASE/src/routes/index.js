import { Router } from "express";
import categoryRoutes from "./category.routes.js";
import todoRoutes from "./todo.routes.js";
import authRoutes from "./auth.routes.js";

const router = Router();

router.use("/categories", categoryRoutes);
router.use("/todos", todoRoutes);
router.use("/auth", authRoutes);
export default router;

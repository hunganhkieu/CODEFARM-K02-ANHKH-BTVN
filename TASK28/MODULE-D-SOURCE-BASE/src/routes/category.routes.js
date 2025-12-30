import { Router } from "express";
import {
  createCategory,
  getCateById,
  getCategorys,
  removeCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const categoryRoutes = Router();

categoryRoutes.use(checkAuth);
categoryRoutes.post("/", createCategory);
categoryRoutes.get("/", getCategorys);
categoryRoutes.get("/:id", getCateById);
categoryRoutes.patch("/:id", updateCategory);
categoryRoutes.delete("/:id", removeCategory);
export default categoryRoutes;

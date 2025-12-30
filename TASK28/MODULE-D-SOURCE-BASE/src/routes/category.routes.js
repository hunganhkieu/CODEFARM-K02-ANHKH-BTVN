import { Router } from "express";
import {
  createCategory,
  getCategories,
  removeCategory,
  updateCategory,
} from "../controllers/category.controller.js";

const categoryRoutes = Router();

categoryRoutes.get("/", getCategories);
categoryRoutes.post("/", createCategory);
categoryRoutes.patch("/:id", updateCategory);
categoryRoutes.delete("/:id", removeCategory);
export default categoryRoutes;

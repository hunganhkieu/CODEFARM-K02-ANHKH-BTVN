import { Router } from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo.controller.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const todoRoutes = Router();

todoRoutes.use(checkAuth);
todoRoutes.get("/:id", getTodos);
todoRoutes.post("/", createTodo);
todoRoutes.patch("/:id", updateTodo);
export default todoRoutes;

import { Router } from "express";
import {
  createTodo,
  getTodoById,
  getTodos,
  removeTodo,
  updateTodo,
} from "../controllers/todo.controller.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const todoRoutes = Router();

todoRoutes.use(checkAuth);
todoRoutes.get("/", getTodos);
todoRoutes.get("/:id", getTodoById);
todoRoutes.post("/", createTodo);
todoRoutes.patch("/:id", updateTodo);
todoRoutes.delete("/:id", removeTodo);
export default todoRoutes;

import api from ".";
import type { AddTodo, UpdateTodo } from "../types/todo";

export const getTodosAPI = async () => {
  const { data } = await api.get("/todos");
  return data;
};
export const createTodoAPI = async (formData: AddTodo) => {
  const { data } = await api.post("/todos", formData);
  return data;
};
export const updateTodoAPI = async (id: string, formData: UpdateTodo) => {
  const { data } = await api.patch(`/todos/${id}`, formData);
  return data;
};
export const deleteTodoAPI = async (id: string) => {
  const { data } = await api.delete(`/todos/${id}`);
  return data;
};

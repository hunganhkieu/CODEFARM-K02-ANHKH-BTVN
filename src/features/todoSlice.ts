import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Todo } from "../types/todo";

interface TodoState {
  todos: Todo[];
  loading: boolean;
  errors: string | null;
  input: string;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  errors: null,
  input: "",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    getTodos(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload;
    },
    setInput(state, action: PayloadAction<string>) {
      state.input = action.payload;
    },
    addTodo(state, action: PayloadAction<Todo>) {
      state.todos.push(action.payload);
      state.input = "";
    },
    removeTodo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter((item) => item._id !== action.payload);
    },
    toggleCompleted(state, action: PayloadAction<string>) {
      state.todos = state.todos.map((item) =>
        item._id === action.payload
          ? { ...item, isCompleted: !item.isCompleted }
          : item
      );
    },
  },
});

export const { getTodos, setInput, addTodo, removeTodo, toggleCompleted } =
  todoSlice.actions;

export default todoSlice.reducer;

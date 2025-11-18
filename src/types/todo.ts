export interface Todo {
  _id: string;
  name: string;
  isCompleted: boolean;
}
export interface AddTodo {
  name: string;
  isCompleted: boolean;
}
export interface UpdateTodo {
  isCompleted: boolean;
}

import { useSelector } from "react-redux";
import type { RootState } from "../store";

const TodoStatusBar = () => {
  const { todos } = useSelector((state: RootState) => state.todo);

  const totalTodo = todos.length;
  const completed = todos.filter((item) => item.isCompleted).length;
  const pending = totalTodo - completed;

  return (
    <div
      style={{
        padding: "12px 16px",
        backgroundColor: "#f0f0f0",
        marginBottom: "16px",
        borderRadius: "8px",
        display: "flex",
        gap: "24px",
        fontWeight: 500,
      }}
    >
      <span>Tổng công việc: {totalTodo}</span>
      <span>Hoàn thành: {completed}</span>
      <span>Chưa hoàn thành: {pending}</span>
    </div>
  );
};

export default TodoStatusBar;

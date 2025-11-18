import { useSelector } from "react-redux";
import type { RootState } from "../store";

const TodoStatusBar = () => {
  const { todos } = useSelector((state: RootState) => state.todo);

  const totalTodo = todos.length;
  const completed = todos.filter((item) => item.isCompleted).length;
  const pending = totalTodo - completed;

  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6 mb-8 rounded-2xl shadow-xl flex flex-wrap justify-center items-center gap-8 text-white">
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs opacity-90 uppercase tracking-wide">
          Tổng công việc
        </span>
        <span className="text-4xl font-bold">{totalTodo}</span>
      </div>

      <div className="w-0.5 h-12 bg-white bg-opacity-30" />

      <div className="flex flex-col items-center gap-2">
        <span className="text-xs opacity-90 uppercase tracking-wide">
          Hoàn thành
        </span>
        <span className="text-4xl font-bold text-green-300">{completed}</span>
      </div>

      <div className="w-0.5 h-12 bg-white bg-opacity-30" />

      <div className="flex flex-col items-center gap-2">
        <span className="text-xs opacity-90 uppercase tracking-wide">
          Chưa hoàn thành
        </span>
        <span className="text-4xl font-bold text-yellow-300">{pending}</span>
      </div>
    </div>
  );
};

export default TodoStatusBar;

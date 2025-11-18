import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTodoAPI, getTodosAPI, updateTodoAPI } from "../api/apiTodo";
import { getTodos, removeTodo, toggleCompleted } from "../features/todoSlice";
import type { AppDispath, RootState } from "../store";
import type { Todo } from "../types/todo";

const TodosPage = () => {
  const { todos } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch<AppDispath>();

  useEffect(() => {
    (async () => {
      const response = await getTodosAPI();
      dispatch(getTodos(response.data));
    })();
  }, [dispatch]);

  const handleRemove = async (id: string) => {
    try {
      if (!confirm("Bạn có đồng ý xóa không?")) return;
      await deleteTodoAPI(id);
      alert("Xóa thành công");
      dispatch(removeTodo(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggle = async (todo: Todo) => {
    try {
      await updateTodoAPI(todo._id, {
        isCompleted: !todo.isCompleted,
      });

      dispatch(toggleCompleted(todo._id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Danh sách công việc
        </h1>
        <Link to="/add">
          <button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
            + Thêm mới
          </button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Tên công việc
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider w-48">
                Trạng thái
              </th>
              <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider w-80">
                Hành động
              </th>
            </tr>
          </thead>

          <tbody>
            {todos.length > 0 ? (
              todos.map((item: Todo) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td
                    className={`px-6 py-5 text-gray-800 font-medium cursor-pointer ${
                      item.isCompleted ? "line-through opacity-60" : ""
                    }`}
                  >
                    {item.name}
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold ${
                        item.isCompleted
                          ? "bg-gradient-to-r from-green-400 to-cyan-400 text-green-900"
                          : "bg-gradient-to-r from-yellow-300 to-orange-300 text-yellow-900"
                      }`}
                    >
                      {item.isCompleted ? "✓ Hoàn thành" : "⏱ Chưa hoàn thành"}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <button
                      onClick={() => handleToggle(item)}
                      className={`${
                        item.isCompleted
                          ? "bg-gradient-to-r from-pink-400 to-red-300 text-red-900"
                          : "bg-gradient-to-r from-cyan-300 to-pink-200 text-cyan-900"
                      } px-5 py-2.5 rounded-lg text-xs font-semibold mr-2 hover:scale-105 transition-transform`}
                    >
                      {item.isCompleted ? "↶ Hủy hoàn thành" : "✓ Hoàn thành"}
                    </button>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="bg-gradient-to-r from-purple-400 to-red-500 text-white px-5 py-2.5 rounded-lg text-xs font-semibold hover:scale-105 transition-transform"
                    >
                      🗑 Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-16 text-center text-gray-400 text-base italic"
                >
                  📋 Không có công việc nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodosPage;

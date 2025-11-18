import { useDispatch, useSelector } from "react-redux";
import { createTodoAPI } from "../api/apiTodo";
import { addTodo, setInput } from "../features/todoSlice";
import type { AppDispath, RootState } from "../store";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const dispatch = useDispatch<AppDispath>();
  const input = useSelector((state: RootState) => state.todo.input);
  const nav = useNavigate();

  const handleAdd = async () => {
    if (!input.trim()) {
      alert("Tên công việc không được để trống");
      return;
    }
    try {
      const newTodo = {
        name: input,
        isCompleted: false,
      };
      const res = await createTodoAPI(newTodo);
      console.log(newTodo);
      dispatch(addTodo(res.data));
      alert("Thêm mới thành công");
      nav("/");
    } catch (error) {
      console.error("Thêm todo lỗi:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        ✨ Thêm công việc mới
      </h1>

      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <label className="block text-xs font-bold text-gray-600 mb-3 uppercase tracking-wider">
          Tên công việc
        </label>

        <input
          type="text"
          value={input}
          onChange={(e) => dispatch(setInput(e.target.value))}
          placeholder="Nhập tên công việc..."
          className="w-full px-5 py-4 text-base border-2 border-gray-200 rounded-xl outline-none transition-all focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
        />

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleAdd}
            className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            ✓ Thêm công việc
          </button>

          <button
            onClick={() => nav("/")}
            className="bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
          >
            ← Hủy
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;

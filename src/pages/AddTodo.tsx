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
    <div style={{ marginBottom: "16px" }}>
      <input
        type="text"
        value={input}
        onChange={(e) => dispatch(setInput(e.target.value))}
        placeholder="Nhập công việc..."
      />
      <button onClick={handleAdd} style={{ marginLeft: "8px" }}>
        Thêm
      </button>
    </div>
  );
};

export default AddTodo;

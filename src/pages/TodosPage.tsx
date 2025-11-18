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
      const res = await updateTodoAPI(todo._id, {
        isCompleted: !todo.isCompleted,
      });

      dispatch(toggleCompleted(todo._id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Link to={"/add"}>
        <button>Thêm mới</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Tên công việc</th>
            <th>Trạng thái công việc</th>
            <th>Hành động</th>
          </tr>
        </thead>

        <tbody>
          {todos.length > 0 ? (
            todos.map((item: Todo) => (
              <tr key={item._id}>
                <td
                  style={{
                    cursor: "pointer",
                    textDecoration: item.isCompleted ? "line-through" : "none",
                    opacity: item.isCompleted ? 0.5 : 1,
                  }}
                >
                  {item.name}
                </td>
                <td>{item.isCompleted ? "Hoàn thành" : "Chưa hoàn thành"}</td>
                <td>
                  <button onClick={() => handleToggle(item)}>
                    {item.isCompleted
                      ? "Hủy hoàn thành"
                      : "Hoàn thành công việc"}
                  </button>
                  <button onClick={() => handleRemove(item._id)}>Xóa</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>ko có công việc nào</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TodosPage;

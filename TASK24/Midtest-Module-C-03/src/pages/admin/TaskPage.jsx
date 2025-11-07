import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteTask } from "../../api/apiTask";

const TaskPage = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [projectName, setProjectName] = useState("");
  const nav = useNavigate();

  const fetchTasks = async (projectId) => {
    const data = await fetch(
      `http://localhost:3000/tasks?projectId=${projectId}`
    ).then((res) => res.json());
    setTasks(data);
  };

  const fetchProjectName = async (projectId) => {
    const data = await fetch(
      `http://localhost:3000/projects/${projectId}`
    ).then((res) => res.json());
    setProjectName(data.title);
  };

  useEffect(() => {
    fetchTasks(projectId);
    fetchProjectName(projectId);
  }, [projectId]);

  const handleDelete = async (id) => {
    try {
      if (!confirm("Bạn có muốn xóa không")) return;
      await deleteTask(id);
      alert("Xóa thành công");
      fetchTasks(projectId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Link to={`/admin/projectId/${projectId}/task/add`}>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Thêm mới
          </button>
        </Link>

        <Link to={"/admin/projects"}>
          {" "}
          <button className="px-3 py-2 border rounded-lg hover:bg-gray-100">
            Quay lại
          </button>
        </Link>
      </div>

      <h3 className="text-xl font-semibold mb-4">
        Dự án: <span className="text-indigo-600">{projectName}</span>
      </h3>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left border">Tên nhiệm vụ</th>
              <th className="p-3 text-left border">Mô tả</th>
              <th className="p-3 text-left border">Trạng thái</th>
              <th className="p-3 text-left border">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {tasks.length > 0 ? (
              tasks.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3 border">{item.title}</td>
                  <td className="p-3 border">{item.description}</td>
                  <td className="p-3 border">{item.status}</td>
                  <td className="p-3 border flex items-center gap-2">
                    <Link
                      to={`/admin/projectId/${projectId}/task/update/${item.id}`}
                    >
                      <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                        Sửa
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4">Không có nhiệm vụ</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskPage;

import { useEffect, useState } from "react";
import { Link } from "react-router";
import { deleteProject } from "../../api/apiProject";

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const fetchProjects = async (filterStatus, searchInput) => {
    const data = await fetch(
      `http://localhost:3000/projects?${
        filterStatus ? `status=${filterStatus}` : ""
      }${searchInput ? `&q=${searchInput}` : ""}`
    ).then((res) => res.json());
    setProjects(data);
  };

  const handleDelete = async (id) => {
    try {
      if (!confirm("Bạn có muốn xóa không?")) return;
      await deleteProject(id);
      alert("Xóa thành công");
      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setFilterStatus("");
    setSearchInput("");
  };

  useEffect(() => {
    fetchProjects(filterStatus, searchInput);
  }, [filterStatus, searchInput]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* FILTERS */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="">Chọn trạng thái</option>
          <option value="not-started">not-started</option>
          <option value="in-progress">in-progress</option>
          <option value="completed">completed</option>
        </select>

        <input
          type="text"
          placeholder="Tìm kiếm"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border rounded-lg px-3 py-2"
        />

        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Reset
        </button>

        <Link to={"/admin/project/add"}>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Thêm mới
          </button>
        </Link>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left border">Tên dự án</th>
              <th className="p-3 text-left border">Trạng thái</th>
              <th className="p-3 text-left border">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {projects.length > 0 ? (
              projects.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3 border">{item.title}</td>
                  <td className="p-3 border">{item.status}</td>
                  <td className="p-3 border space-x-2">
                    <Link to={`/admin/projectId/${item.id}/tasks`}>
                      <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Xem chi tiết
                      </button>
                    </Link>

                    <Link to={`/admin/project/update/${item.id}`}>
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
                <td className="p-4">Không có dự án</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectPage;

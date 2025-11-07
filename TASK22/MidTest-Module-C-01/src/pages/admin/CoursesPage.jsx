import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteCourse } from "../../api/apiCourse";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const nav = useNavigate();
  const fetchCourses = async (inputSearch, sortPrice) => {
    const data = await fetch(
      `http://localhost:3000/courses?${inputSearch ? `q=${inputSearch}` : ""}${
        sortPrice ? `&_sort=price&_order=${sortPrice}` : ""
      }`
    ).then((res) => res.json());
    setCourses(data);
  };

  useEffect(() => {
    fetchCourses(inputSearch, sortPrice);
  }, [inputSearch, sortPrice]);

  const handleDelete = async (id) => {
    try {
      if (!confirm("Bạn có muốn xóa không?")) return;
      await deleteCourse(id);
      alert("Xóa thành công");
      fetchCourses();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setInputSearch("");
    setSortPrice("");
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    nav("/auth/login");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Quản lý khóa học
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 font-medium"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Tìm kiếm khóa học..."
                value={inputSearch}
                onChange={(e) => setInputSearch(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
              />
            </div>

            {/* Sort Select */}
            <div>
              <select
                value={sortPrice}
                onChange={(e) => setSortPrice(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none bg-white"
              >
                <option value="">Sắp xếp theo giá</option>
                <option value="asc">Giá tăng dần</option>
                <option value="desc">Giá giảm dần</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleReset}
                className="flex-1 px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200 font-medium"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Add Button */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Link to="/admin/course/add">
              <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-200 font-medium shadow-md">
                + Thêm khóa học mới
              </button>
            </Link>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Tên khóa học
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Mô tả
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Giá tiền
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {courses && courses.length > 0 ? (
                  courses.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`hover:bg-blue-50 transition duration-150 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {item.id}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/admin/courseId/${item.id}/lessons`}
                          className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                        >
                          {item.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                        {item.description}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-600">
                        {item.price?.toLocaleString()} VNĐ
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <Link to={`/admin/course/update/${item.id}`}>
                            <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-200 text-sm font-medium">
                              Sửa
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 text-sm font-medium"
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      Không có khóa học nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;

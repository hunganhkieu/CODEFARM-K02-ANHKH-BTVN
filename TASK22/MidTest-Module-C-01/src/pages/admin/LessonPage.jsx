import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteLesson } from "../../api/apiLesson";

const LessonPage = () => {
  const [lesson, setLesson] = useState([]);
  const [courseName, setCourseName] = useState([]);
  const { courseId } = useParams();
  const nav = useNavigate();
  const fetchLesson = async (courseId) => {
    const data = await fetch(
      `http://localhost:3000/lessons?courseId=${courseId}`
    ).then((res) => res.json());
    setLesson(data);
  };

  const fetchCourseName = async (courseId) => {
    const data = await fetch(`http://localhost:3000/courses/${courseId}`).then(
      (res) => res.json()
    );
    setCourseName(data.title);
  };

  useEffect(() => {
    fetchLesson(courseId);
    fetchCourseName(courseId);
  }, [courseId]);

  const handleDelete = async (id) => {
    try {
      if (!confirm("Bạn có muốn xóa không?")) return;
      await deleteLesson(id);
      alert("Xóa thành công");
      fetchLesson(courseId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Quản lý bài học
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Khóa học:{" "}
                <span className="font-semibold text-purple-600">
                  {courseName}
                </span>
              </p>
            </div>
            <Link to={"/admin/courses"}>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200 font-medium">
                ← Quay lại
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <Link to={`/admin/courseId/${courseId}/lesson/add`}>
            <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition duration-200 font-medium shadow-md">
              + Thêm bài học mới
            </button>
          </Link>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Tên bài học
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Nội dung
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {lesson.length > 0 ? (
                  lesson.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`hover:bg-purple-50 transition duration-150 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">
                        {item.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-md truncate">
                        {item.content}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <Link
                            to={`/admin/courseId/${courseId}/lesson/update/${item.id}`}
                          >
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
                    <td colSpan="4" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg
                          className="w-16 h-16 text-gray-300 mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                        <p className="text-gray-500 text-lg font-medium">
                          Chưa có bài học nào
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                          Hãy thêm bài học đầu tiên cho khóa học này
                        </p>
                      </div>
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

export default LessonPage;

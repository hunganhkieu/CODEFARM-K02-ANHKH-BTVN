import { useNavigate } from "react-router";

const NotFoundPage = () => {
  const nav = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          404 - Not Found
        </h1>
        <p className="text-gray-700 mb-6">
          Trang bạn tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>

        <button
          onClick={() => nav(-1)}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;

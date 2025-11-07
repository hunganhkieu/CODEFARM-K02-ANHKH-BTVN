import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const nav = useNavigate();
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 text-center px-4">
      <h1 className="text-8xl font-extrabold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-3 mb-6">
        Trang bạn tìm không tồn tại.
      </p>

      <button
        onClick={() => nav(-1)}
        className="px-6 py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all duration-200"
      >
        Quay về trang chủ
      </button>
    </div>
  );
};

export default NotFoundPage;

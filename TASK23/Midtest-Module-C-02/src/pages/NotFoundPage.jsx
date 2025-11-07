import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const nav = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">404</h1>
        <p className="text-gray-600 mb-6">Trang không tồn tại.</p>

        <button
          onClick={() => nav(-1)}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;

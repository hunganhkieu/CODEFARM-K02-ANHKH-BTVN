import { Link } from "react-router-dom";

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-3">403 Forbidden</h1>
        <p className="text-gray-600 mb-6">
          Bạn không có quyền truy cập vào trang này.
        </p>

        <Link to="/auth/login">
          <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Quay lại trang đăng nhập
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ForbiddenPage;

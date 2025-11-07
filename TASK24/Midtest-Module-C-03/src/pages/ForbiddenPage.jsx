import { Link } from "react-router-dom";

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-3">
          403 - Forbidden
        </h1>
        <p className="text-gray-700 mb-6">
          Bạn không có quyền truy cập vào tài nguyên này.
        </p>

        <Link to={"/auth/login"}>
          <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Quay về trang đăng nhập
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ForbiddenPage;

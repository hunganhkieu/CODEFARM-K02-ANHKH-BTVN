import { Link } from "react-router-dom";

const ForbiddenPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-orange-200 text-center px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-red-600 max-w-xl mb-6">
        Forbidden: Bạn không có quyền truy cập trang này.
      </h1>

      <Link to="/auth/login">
        <button className="px-6 py-3 bg-red-600 text-white rounded-xl text-lg font-semibold hover:bg-red-700 transition-all duration-200">
          Về trang đăng nhập
        </button>
      </Link>
    </div>
  );
};

export default ForbiddenPage;

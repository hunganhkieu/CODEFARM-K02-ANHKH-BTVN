import { Link, useNavigate } from "react-router-dom";

const HeaderAdmin = () => {
  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    nav("/auth/login");
    alert("Đăng xuất thành công");
  };

  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* LEFT: MENU */}
      <nav>
        <ul className="flex gap-6 text-lg">
          <li>
            <Link
              to="/admin/products"
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Trang sản phẩm
            </Link>
          </li>
          <li>
            <Link
              to="/admin/categories"
              className="text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Trang danh mục
            </Link>
          </li>
        </ul>
      </nav>

      {/* RIGHT: LOGOUT BUTTON */}
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
      >
        Đăng xuất
      </button>
    </header>
  );
};

export default HeaderAdmin;

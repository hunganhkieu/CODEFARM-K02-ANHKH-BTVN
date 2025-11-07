import { useNavigate } from "react-router-dom";

const HeaderAdmin = () => {
  const nav = useNavigate();

  const handleLogout = () => {
    if (!confirm("Bạn có muốn đăng xuất không?")) return;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    nav("/auth/login");
  };

  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 active:scale-95 transition-all"
      >
        Đăng xuất
      </button>
    </header>
  );
};

export default HeaderAdmin;

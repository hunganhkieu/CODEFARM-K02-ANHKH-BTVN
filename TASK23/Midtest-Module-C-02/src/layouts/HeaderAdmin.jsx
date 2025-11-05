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
    <>
      <div style={{ display: "flex", gap: "20px" }}>
        <nav>
          <ul>
            <li>
              <Link to={"/admin/products"}>Trang sản phẩm</Link>
            </li>
            <li>
              <Link to={"/admin/categories"}>Trang danh mục</Link>
            </li>
          </ul>
        </nav>

        <button style={{ height: "40px" }} onClick={handleLogout}>
          Đăng xuất
        </button>
      </div>
    </>
  );
};

export default HeaderAdmin;

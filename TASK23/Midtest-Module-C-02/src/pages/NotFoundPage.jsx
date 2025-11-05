import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h1>404 NOT FOUND</h1>
      <Link to={"/admin/products"}>
        <button>Quay lại trang quản lý</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;

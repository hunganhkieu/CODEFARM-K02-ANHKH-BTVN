import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h1>404 NOT FOUND</h1>
      <Link to={"/"}>Quay về trang chủ</Link>
    </div>
  );
};

export default NotFoundPage;

import { Link, useNavigate } from "react-router-dom";

const ForbiddenPage = () => {
  const nav = useNavigate();
  return (
    <div>
      <h1>You dont have permission to access this page.</h1>
      <Link to={"/auth/login"}>
        <button>Về trang đăng nhập</button>
      </Link>
    </div>
  );
};

export default ForbiddenPage;

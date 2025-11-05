import React from "react";
import { Link } from "react-router-dom";

const ForbiddenPage = () => {
  return (
    <div>
      <h1>Forbidden: You do not have access to this page.</h1>
      <Link to={"/auth/login"}>
        <button>Quay lại trang đăng nhập</button>
      </Link>
    </div>
  );
};

export default ForbiddenPage;

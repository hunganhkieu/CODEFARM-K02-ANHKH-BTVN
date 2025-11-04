import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={"/auth/login"}>Đăng nhập</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;

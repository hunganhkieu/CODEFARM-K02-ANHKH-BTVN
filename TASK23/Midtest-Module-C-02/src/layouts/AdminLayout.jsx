import { Outlet } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";

const AdminLayout = () => {
  return (
    <div>
      <HeaderAdmin />
      <Outlet />
    </div>
  );
};

export default AdminLayout;

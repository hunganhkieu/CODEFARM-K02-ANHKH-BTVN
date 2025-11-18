import { Outlet } from "react-router-dom";
import TodoStatusBar from "../pages/TodoStatusBar";

const AdminLayout = () => {
  return (
    <div>
      <TodoStatusBar />

      <Outlet />
    </div>
  );
};

export default AdminLayout;

import { Outlet } from "react-router-dom";
import Header from "./Header";

const ClientLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default ClientLayout;

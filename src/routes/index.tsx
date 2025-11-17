import { createBrowserRouter, RouterProvider } from "react-router-dom";
import adminRoute from "./adminRoute";
const route = createBrowserRouter([...adminRoute]);

const AppRoute = () => {
  return <RouterProvider router={route} />;
};
export default AppRoute;

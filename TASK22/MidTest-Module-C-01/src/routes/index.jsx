import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import adminRoute from "./adminRoute";
import authRoute from "./authRoute";
import clientRoute from "./clientRoute";
const route = createBrowserRouter([
  ...clientRoute,

  ...authRoute,
  ...adminRoute,
  { path: "*", Component: NotFoundPage },
]);

const AppRoute = () => {
  return <RouterProvider router={route} />;
};
export default AppRoute;

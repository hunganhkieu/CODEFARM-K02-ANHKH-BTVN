import { createBrowserRouter, RouterProvider } from "react-router-dom";
import adminRoute from "./adminRoute";
import NotFoundPage from "../pages/NotFoundPage";
import authRoute from "./authRoute";
import clientRoute from "./clientRoute";
const route = createBrowserRouter([
  ...adminRoute,
  ...authRoute,
  ...clientRoute,
  { path: "*", Component: NotFoundPage },
]);

const AppRoute = () => {
  return <RouterProvider router={route} />;
};

export default AppRoute;

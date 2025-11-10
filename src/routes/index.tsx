import { createBrowserRouter, RouterProvider } from "react-router-dom";
import clientRoute from "./clientRoute";

const route = createBrowserRouter([...clientRoute]);

const AppRoute = () => {
  return <RouterProvider router={route} />;
};

export default AppRoute;

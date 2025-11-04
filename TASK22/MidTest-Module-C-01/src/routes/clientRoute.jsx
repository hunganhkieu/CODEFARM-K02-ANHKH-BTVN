import { Navigate } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
import ForbiddenPage from "../pages/ForbiddenPage";

const clientRoute = [
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      { index: true, element: <Navigate to={"auth/login"} /> },
      { path: "403", Component: ForbiddenPage },
    ],
  },
];

export default clientRoute;

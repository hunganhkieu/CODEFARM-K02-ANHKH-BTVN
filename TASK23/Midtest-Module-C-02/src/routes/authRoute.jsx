import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

const authRoute = [
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      { path: "register", Component: RegisterPage },
      { path: "login", Component: LoginPage },
    ],
  },
];

export default authRoute;

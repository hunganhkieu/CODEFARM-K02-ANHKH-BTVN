import AdminLayout from "../layouts/AdminLayout";
import AddTodo from "../pages/AddTodo";
import TodosPage from "../pages/TodosPage";

const adminRoute = [
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { index: true, Component: TodosPage },
      { path: "add", Component: AddTodo },
    ],
  },
];

export default adminRoute;

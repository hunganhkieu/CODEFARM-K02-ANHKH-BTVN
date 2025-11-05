import AdminLayout from "../layouts/AdminLayout";
import FormCategory from "../pages/admin/categories/FormCategory";
import ManagerCategory from "../pages/admin/categories/ManagerCategory";
import FormProduct from "../pages/admin/products/FormProduct";
import ManagerProducts from "../pages/admin/products/ManagerProducts";
import ProtectedRoute from "./components/ProtectedRoute";

const adminRoute = [
  {
    path: "admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "products", Component: ManagerProducts },
      { path: "product/add", Component: FormProduct },
      { path: "product/update/:id", Component: FormProduct },
      { path: "categories", Component: ManagerCategory },
      { path: "category/add", Component: FormCategory },
      { path: "category/update/:id", Component: FormCategory },
    ],
  },
];

export default adminRoute;

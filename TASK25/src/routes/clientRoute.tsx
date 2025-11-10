import ClientLayout from "../layouts/ClientLayout";
import CartPage from "../pages/CartPage";
import ShopPage from "../pages/ShopPage";

const clientRoute = [
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      { index: true, Component: ShopPage },
      { path: "cart", Component: CartPage },
    ],
  },
];

export default clientRoute;

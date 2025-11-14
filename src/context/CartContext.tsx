import { createContext, useEffect, useReducer } from "react";
import type { CartAction, CartContextType, ProductCart } from "../types/Cart";

export const CartContext = createContext<CartContextType>({
  carts: [],
  addToCart: () => {},
  removeItemCart: () => {},
  removeAllCart: () => {},
  increase: () => {},
  decrease: () => {},
  totals: 0,
});

function cartReducer(states: ProductCart[], action: CartAction) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const product = action.payload;
      const existing = states.find(
        (item) => item.productId === product.productId
      );

      if (existing) {
        return states.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...states, { ...product, quantity: 1 }];
    }
    case "REMOVE_ITEM":
      return states.filter((item) => item.productId !== action.payload);

    case "REMOVE_ALL":
      if (!confirm("Bạn có muốn xóa tất cả sản phẩm không?")) return states;
      return [];

    case "INCREASE":
      return states.map((item) =>
        item.productId === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case "DECREASE":
      return states.map((item) =>
        item.productId === action.payload
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    default:
      return states;
  }
}
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [carts, dispatch] = useReducer(cartReducer, { carts: [] }, () => {
    const saveCart = localStorage.getItem("cart");
    return saveCart ? JSON.parse(saveCart) : [];
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(carts));
  }, [carts]);

  const addToCart = (product: ProductCart) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const removeItemCart = (productId: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId });
  };

  const removeAllCart = () => {
    dispatch({ type: "REMOVE_ALL" });
  };

  const increase = (productId: number) => {
    dispatch({ type: "INCREASE", payload: productId });
  };

  const decrease = (productId: number) => {
    dispatch({ type: "DECREASE", payload: productId });
  };

  const totals = carts.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
  return (
    <CartContext.Provider
      value={{
        carts,
        addToCart,
        removeItemCart,
        removeAllCart,
        increase,
        decrease,
        totals,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

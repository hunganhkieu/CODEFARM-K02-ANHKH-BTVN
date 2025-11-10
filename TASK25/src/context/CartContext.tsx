import { createContext, useEffect, useState } from "react";
import type { ProductCart } from "../types/Product";

type CartContextType = {
  carts: ProductCart[];
  addToCart: (product: ProductCart) => void;
  removeItemCart: (productId: number) => void;
  removeAllCart: () => void;
  total: number;
};

export const CartContext = createContext<CartContextType>({
  carts: [],
  addToCart: () => {},
  removeItemCart: () => {},
  removeAllCart: () => {},
  total: 0,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [carts, setCarts] = useState<ProductCart[]>(() => {
    const saveCart = localStorage.getItem("cart");
    return saveCart ? JSON.parse(saveCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(carts));
  }, [carts]);

  const addToCart = (product: ProductCart) => {
    setCarts((pre) => [...pre, product]);
  };

  const removeItemCart = (index: number) => {
    setCarts((pre) => pre.filter((_, i) => i !== index));
  };

  const removeAllCart = () => {
    if (!confirm("Bạn có muốn xóa tất cả sản phẩm không?")) return;
    setCarts([]);
  };
  const total = carts.reduce((acc, cur) => acc + cur.price, 0);
  return (
    <CartContext.Provider
      value={{ carts, addToCart, removeItemCart, removeAllCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

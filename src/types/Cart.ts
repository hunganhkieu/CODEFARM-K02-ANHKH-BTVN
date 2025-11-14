export type ProductCart = {
  productId: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
  totalItem?: number;
};

export type CartContextType = {
  carts: ProductCart[];
  addToCart: (product: ProductCart) => void;
  removeItemCart: (productId: number) => void;
  removeAllCart: () => void;
  increase: (productId: number) => void;
  decrease: (productId: number) => void;
  totals: number;
};

export type CartAction =
  | { type: "ADD_TO_CART"; payload: ProductCart }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "REMOVE_ALL" }
  | { type: "INCREASE"; payload: number }
  | { type: "DECREASE"; payload: number };

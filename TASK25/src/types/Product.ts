export type Products = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};
export type ProductCart = {
  productId: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
};

import { useContext, useEffect, useState } from "react";
import type { Products } from "../types/Product";
import { CartContext } from "../context/CartContext";
import type { ProductCart } from "../types/Cart";

const ShopPage = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const { addToCart } = useContext(CartContext);

  const fetchProducts = async () => {
    const data = await fetch("https://dummyjson.com/products").then((res) =>
      res.json()
    );
    setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (dataProduct: Products) => {
    const product: ProductCart = {
      productId: dataProduct.id,
      title: dataProduct.title,
      price: dataProduct.price,
      thumbnail: dataProduct.thumbnail,
      quantity: 1,
    };

    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12"></div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative overflow-hidden bg-gray-100 h-48 flex items-center justify-center">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="p-5">
                  <h2 className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2 min-h-[3.5rem]">
                    {item.title}
                  </h2>

                  <div className="flex items-center justify-between mb-4">
                    <p className="text-2xl font-bold text-blue-600">
                      ${item.price}
                    </p>
                  </div>

                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md active:scale-95 transform"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <p className="text-xl text-gray-500 font-medium">
              Không có sản phẩm
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;

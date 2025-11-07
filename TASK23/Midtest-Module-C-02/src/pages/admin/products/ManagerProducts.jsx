import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../../api/apiProduct";

const ManagerProducts = () => {
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const fetchProducts = async (inputSearch, filterCategory) => {
    const data = await fetch(
      `http://localhost:3000/products?${inputSearch ? `q=${inputSearch}` : ""}${
        filterCategory ? `&categoryId=${filterCategory}` : ""
      }`
    ).then((res) => res.json());
    setProducts(data);
  };

  const fetchCategoryName = async () => {
    const category = await fetch("http://localhost:3000/categories").then(
      (res) => res.json()
    );
    setCategoryName(category);
  };

  useEffect(() => {
    fetchProducts(inputSearch, filterCategory);
    fetchCategoryName();
  }, [inputSearch, filterCategory]);

  const handleDelete = async (id) => {
    try {
      if (!confirm("Bạn có muốn xóa không?")) return;
      await deleteProduct(id);
      alert("Xóa thành công");
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setInputSearch("");
    setFilterCategory("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Trang quản lý sản phẩm</h1>

      {/* Search + Filter */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <input
          type="text"
          placeholder="Tìm kiếm"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          className="border p-2 rounded-lg w-64"
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="">Chọn danh mục</option>
          {categoryName.map((cate) => (
            <option value={cate.id} key={cate.id}>
              {cate.title}
            </option>
          ))}
        </select>

        <button
          onClick={handleReset}
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
        >
          Reset
        </button>
      </div>
      <Link to={"/admin/product/add"}>
        <button className="bg-blue-600 text-white px-4 py-2 mb-3 rounded-lg shadow hover:bg-blue-700">
          Thêm mới
        </button>
      </Link>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Tên sản phẩm</th>
              <th className="p-3 border">Giá</th>
              <th className="p-3 border">Danh mục</th>
              <th className="p-3 border">Tồn kho</th>
              <th className="p-3 border">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((item, index) => {
                const categories = categoryName.find(
                  (cate) => cate.id === item.categoryId
                );
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-3 border">{item.title}</td>
                    <td className="p-3 border">{item.price}</td>
                    <td className="p-3 border">
                      {categories ? categories.title : "Chưa có danh mục"}
                    </td>
                    <td className="p-3 border">{item.stock}</td>

                    <td className="p-3 border flex gap-2">
                      <Link to={`/admin/product/update/${item.id}`}>
                        <button className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600">
                          Sửa
                        </button>
                      </Link>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="p-3 border text-center" colSpan={5}>
                  Không có sản phẩm
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerProducts;

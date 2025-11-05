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
    // console.log(category);
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
    <div>
      <h1>Trang quản lý sản phẩm</h1>
      <input
        type="text"
        placeholder="Tìm kiếm"
        value={inputSearch}
        onChange={(e) => setInputSearch(e.target.value)}
      />

      <select
        name=""
        id=""
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="">Chọn danh mục muốn lọc</option>
        {categoryName.map((cate) => (
          <option value={cate.id} key={cate.id}>
            {cate.title}
          </option>
        ))}
      </select>

      <button onClick={handleReset}>Reset</button>
      <Link to={"/admin/product/add"}>
        <button>Thêm mới</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Danh mục</th>
            <th>Tồn kho</th>
            <th>Hành động</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((item, index) => {
              const categories = categoryName.find(
                (cate) => cate.id === item.categoryId
              );
              return (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{categories ? categories.title : "Chưa có danh mục"}</td>
                  <td>{item.stock}</td>
                  <td>
                    <Link to={`/admin/product/update/${item.id}`}>
                      {" "}
                      <button>Cập nhật</button>
                    </Link>
                    <button onClick={() => handleDelete(item.id)}>Xóa</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>Không có sản phẩm</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerProducts;

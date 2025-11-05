import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteCategory } from "../../../api/apiCategory";

const ManagerCategory = () => {
  const [categories, setcategories] = useState([]);
  const fetchCategories = async () => {
    const data = await fetch("http://localhost:3000/categories").then((res) =>
      res.json()
    );
    setcategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      if (!confirm("Bạn có muốn xóa không?")) return;
      await deleteCategory(id);
      alert("Xóa thành công");
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Trang quản lý danh mục</h1>
      <Link to={"/admin/category/add"}>
        <button>Thêm mới</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Slug</th>
            <th>Hành động</th>
          </tr>
        </thead>

        <tbody>
          {categories.length > 0 ? (
            categories.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.slug}</td>
                <td>
                  <Link to={`/admin/category/update/${item.id}`}>
                    <button>Cập nhật</button>
                  </Link>
                  <button onClick={() => handleDelete(item.id)}>Xóa</button>
                </td>
              </tr>
            ))
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

export default ManagerCategory;

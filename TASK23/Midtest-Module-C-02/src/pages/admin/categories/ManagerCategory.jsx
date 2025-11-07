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
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Trang quản lý danh mục</h1>

        <Link to={"/admin/category/add"}>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Thêm mới
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Tên sản phẩm</th>
              <th className="p-3 border">Slug</th>
              <th className="p-3 border">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {categories.length > 0 ? (
              categories.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3 border">{item.title}</td>
                  <td className="p-3 border">{item.slug}</td>
                  <td className="p-3 border flex gap-2">
                    <Link to={`/admin/category/update/${item.id}`}>
                      <button className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                        Cập nhật
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4">Không có sản phẩm</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerCategory;

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../../../api/apiCategory";
import {
  createProduct,
  getProductId,
  updateProduct,
} from "../../../api/apiProduct";
import { productSchema } from "../../../schemas/AdminSchema";

const FormProduct = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(productSchema) });

  const { id } = useParams();
  const nav = useNavigate();
  const [categoryName, setCategoryName] = useState([]);

  const fetchCategoryName = async () => {
    const categories = await getCategories();
    setCategoryName(categories);
  };

  const fetchProductId = async (id, reset) => {
    try {
      const data = await getProductId(id);
      reset(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategoryName();
    if (id) fetchProductId(id, reset);
  }, [id, reset]);

  const onSubmit = async (data) => {
    const newData = {
      ...data,
      categoryId: data.categoryId,
    };

    try {
      if (!id) {
        await createProduct(newData);
        alert("Thêm mới thành công");
        nav("/admin/products");
      }
      if (id) {
        await updateProduct(id, newData);
        alert("Cập nhật thành công");
        nav("/admin/products");
      }
    } catch (error) {
      console.log(error);
    }
    console.log(newData);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md mt-6">
      <button
        onClick={() => nav(-1)}
        className="bg-blue text-blue-600 hover:underline mb-4"
      >
        ← Quay lại
      </button>

      <h1 className="text-2xl font-semibold mb-6">
        {!id ? "Thêm sản phẩm mới" : "Cập nhật sản phẩm"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Tên sản phẩm */}
        <div>
          <label className="font-medium">Tên sản phẩm</label>
          <input
            type="text"
            {...register("title")}
            className="border p-2 w-full rounded-lg mt-1"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Giá */}
        <div>
          <label className="font-medium">Giá</label>
          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
            className="border p-2 w-full rounded-lg mt-1"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="font-medium">Danh mục</label>
          <select
            {...register("categoryId")}
            className="border p-2 w-full rounded-lg mt-1"
          >
            <option value="">Chọn danh mục</option>
            {categoryName.map((cate) => (
              <option value={cate.id} key={cate.id}>
                {cate.title}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-red-500 text-sm">{errors.categoryId.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="font-medium">Mô tả sản phẩm</label>
          <textarea
            {...register("description")}
            className="border p-2 w-full rounded-lg mt-1 h-28 resize-none"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Thumbnail */}
        <div>
          <label className="font-medium">Thumbnail</label>
          <input
            type="text"
            {...register("thumbnail")}
            className="border p-2 w-full rounded-lg mt-1"
          />
          {errors.thumbnail && (
            <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>
          )}
        </div>

        {/* Stock */}
        <div>
          <label className="font-medium">Tồn kho</label>
          <input
            type="number"
            {...register("stock", { valueAsNumber: true })}
            className="border p-2 w-full rounded-lg mt-1"
          />
          {errors.stock && (
            <p className="text-red-500 text-sm">{errors.stock.message}</p>
          )}
        </div>

        {/* Submit */}
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all shadow">
          {!id ? "Thêm mới" : "Cập nhật"}
        </button>
      </form>
    </div>
  );
};

export default FormProduct;

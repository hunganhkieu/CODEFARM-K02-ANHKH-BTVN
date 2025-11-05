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
    // setCategoryId(id);
  };

  const fetchProductId = async (id, reset) => {
    try {
      const data = await getProductId(id);
      // console.log(data);
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
      categoryId: Number(data.categoryId),
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
    // console.log(newData);
  };
  return (
    <div>
      <button onClick={() => nav(-1)}>Quay lại</button>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="">Tên sản phẩm </label>
          <input type="text" {...register("title", { required: true })} />
          {errors.title && <span>{errors.title.message}</span>}
        </div>
        <div>
          <label htmlFor="">Giá</label>
          <input
            type="number"
            {...register("price", { required: true, valueAsNumber: true })}
          />
          {errors.price && <span>{errors.price.message}</span>}
        </div>

        <div>
          <select
            name=""
            id=""
            {...register("categoryId", { required: true, valueAsNumber: true })}
          >
            <option value="">Chọn danh mục</option>
            {categoryName.map((cate) => (
              <option value={cate.id} key={cate.id}>
                {cate.title}
              </option>
            ))}
          </select>
          {errors.categoryId && <span>{errors.categoryId.message}</span>}
        </div>

        <div>
          <label htmlFor="">Mô tả sản phẩm</label>
          <textarea
            name=""
            id=""
            {...register("description", { required: true })}
          ></textarea>
          {errors.description && <span>{errors.description.message}</span>}
        </div>

        <div>
          <label htmlFor="">Thumbnail</label>
          <input type="text" {...register("thumbnail", { required: true })} />
          {errors.thumbnail && <span>{errors.thumbnail.message}</span>}
        </div>

        <div>
          <label htmlFor="">Stock</label>
          <input
            type="number"
            {...register("stock", { required: true, valueAsNumber: true })}
          />
          {errors.stock && <span>{errors.stock.message}</span>}
        </div>
        <button>{!id ? "Thêm mới" : "Cập nhật"}</button>
      </form>
    </div>
  );
};

export default FormProduct;

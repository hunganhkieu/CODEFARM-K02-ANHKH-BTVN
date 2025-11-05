import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCategory,
  getCategoryId,
  updateCategory,
} from "../../../api/apiCategory";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const FormCategory = () => {
  const categorySchema = z.object({
    title: z
      .string()
      .nonempty({ message: "Tên danh mục không được để trống" })
      .min(3, { message: "Tên danh mục phải có tối thiểu 3 ký tự" }),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(categorySchema) });
  const { id } = useParams();
  const nav = useNavigate();

  const onSubmit = async (data) => {
    const newData = {
      ...data,
      slug: data.title.toLowerCase(),
    };
    try {
      if (!id) {
        await createCategory(newData);
        alert("Thêm mới thành công");
        // console.log(newData);
        nav("/admin/categories");
      }
      if (id) {
        await updateCategory(id, newData);
        alert("Cập nhật thành công");
        // console.log(newData);
        nav("/admin/categories");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      (async () => {
        const data = await getCategoryId(id);
        reset(data);
      })();
    }
  }, [id, reset]);
  return (
    <div>
      <button onClick={() => nav(-1)}>Quay lại</button>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="">Tên danh mục </label>
          <input type="text" {...register("title", { required: true })} />
          {errors.title && <span>{errors.title.message}</span>}
        </div>

        <button>{!id ? "Thêm mới" : "Cập nhật"}</button>
      </form>
    </div>
  );
};

export default FormCategory;

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
        nav("/admin/categories");
      }
      if (id) {
        await updateCategory(id, newData);
        alert("Cập nhật thành công");
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
    <div className="max-w-xl mx-auto bg-white shadow-md p-6 rounded-lg">
      <button
        onClick={() => nav(-1)}
        className="mb-4 px-4 py-2 border rounded-lg hover:bg-gray-100"
      >
        Quay lại
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Tên danh mục</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            {...register("title")}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>

        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg w-full">
          {!id ? "Thêm mới" : "Cập nhật"}
        </button>
      </form>
    </div>
  );
};

export default FormCategory;

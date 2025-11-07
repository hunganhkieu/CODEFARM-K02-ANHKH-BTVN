import { useForm } from "react-hook-form";
import { createCourse, getCourseId, updateCourse } from "../../api/apiCourse";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const courseSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "Tên khóa học không được để trống" })
    .min(6, { message: "Tên khóa học tối thiểu 6 kí tự" }),
  price: z
    .number({ message: "Giá phải là số và không được để trống" })
    .min(1, { message: "Giá phải lớn hơn 0" }),
  description: z.string().optional(),
});

const FormCourse = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(courseSchema) });
  const nav = useNavigate();
  const { id } = useParams();

  const onSubmit = async (data) => {
    try {
      if (!id) {
        await createCourse(data);
        alert("Thêm mới thành công");
        nav(-1);
      }
      if (id) {
        await updateCourse(id, data);
        alert("Cập nhật thành công");
        nav(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      (async () => {
        const data = await getCourseId(id);
        reset(data);
      })();
    }
  }, [id, reset]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">
              {!id ? "Thêm khóa học mới" : "Cập nhật khóa học"}
            </h1>
            <Link to={"/admin/courses"}>
              {" "}
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200 font-medium">
                ← Quay lại
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title Field */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Tên khóa học <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                {...register("title", { required: true })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none"
                placeholder="Nhập tên khóa học..."
              />
              {errors.title && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.title.message}
                </span>
              )}
            </div>

            {/* Description Field */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Mô tả khóa học
              </label>
              <textarea
                id="description"
                rows="5"
                {...register("description")}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none resize-none"
                placeholder="Nhập mô tả về khóa học..."
              ></textarea>
              {errors.description && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.description.message}
                </span>
              )}
            </div>

            {/* Price Field */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Giá khóa học (VNĐ) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="price"
                {...register("price", { required: true, valueAsNumber: true })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none"
                placeholder="Nhập giá khóa học..."
              />
              {errors.price && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.price.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition duration-200 shadow-lg"
              >
                {!id ? "✓ Thêm mới" : "✓ Cập nhật"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormCourse;

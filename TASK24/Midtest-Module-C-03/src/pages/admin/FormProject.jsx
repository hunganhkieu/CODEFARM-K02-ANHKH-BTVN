import { useForm } from "react-hook-form";
import {
  createProject,
  getProjectId,
  updateProject,
} from "../../api/apiProject";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const FormProject = () => {
  const projectSchema = z.object({
    title: z
      .string()
      .min(3, { message: "Tên dự án phải có tối thiểu 3 ký tự" }),
    description: z.string().optional(),
    status: z.string().min(1, { message: "Xin mời chọn danh mục" }),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(projectSchema) });
  const nav = useNavigate();
  const { id } = useParams();
  const onSubmit = async (data) => {
    try {
      if (!id) {
        await createProject(data);
        alert("Thêm mới thành công");
        nav("/admin/projects");
      }
      if (id) {
        await updateProject(id, data);
        alert("cập nhật thành công");
        nav("/admin/projects");
      }
    } catch (error) {
      console.log(error);
    }
    // console.log(data);
  };

  useEffect(() => {
    if (id) {
      (async () => {
        const data = await getProjectId(id);
        reset(data);
      })();
    }
  }, [id, reset]);
  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => nav(-1)}
            className="text-sm px-3 py-2 rounded-md border hover:bg-gray-100"
          >
            Quay lại
          </button>
          <h2 className="text-lg font-semibold">
            {!id ? "Thêm dự án" : "Chỉnh sửa dự án"}
          </h2>
        </div>

        <form action="" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Tên dự án</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                errors.title ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Mô tả</label>
            <textarea
              {...register("description", { required: true })}
              className={`w-full min-h-[120px] rounded-md border px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                errors.description ? "border-red-400" : "border-gray-300"
              }`}
            ></textarea>
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Trạng thái</label>
            <select
              {...register("status", { required: true })}
              className={`w-full rounded-md border px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
                errors.status ? "border-red-400" : "border-gray-300"
              }`}
            >
              <option value="">Chọn danh mục</option>
              <option value="not-started">Not-started</option>
              <option value="in-progress">in-progress</option>
              <option value="completed">completed</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-600">
                {errors.status.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => reset()}
              className="px-4 py-2 rounded-md border hover:bg-gray-50"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700"
            >
              {!id ? "Thêm mới" : "Cập nhật"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormProject;

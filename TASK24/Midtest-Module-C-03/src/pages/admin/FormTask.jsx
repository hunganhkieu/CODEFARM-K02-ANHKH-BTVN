import { useForm } from "react-hook-form";
import { createTask, getTaskId, updateTask } from "../../api/apiTask";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const taskSchema = z.object({
  title: z.string().min(3, { message: "Tên nhiệm vụ phải tối thiểu 3 ký tự" }),
  description: z.string().optional(),
  status: z.string().min(1, { message: "Bắt buộc phải chọn trạng thái" }),
});
const FormTask = () => {
  const nav = useNavigate();
  const { projectId } = useParams();
  const { taskId } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(taskSchema) });

  const onSubmit = async (data) => {
    try {
      const newData = {
        ...data,
        projectId: Number(projectId),
      };
      if (!taskId && projectId) {
        await createTask(newData);
        // console.log(newData);

        alert("Thêm mới thành công");
        nav(-1);
      }
      if (taskId && projectId) {
        await updateTask(taskId, newData);
        // console.log(newData);

        alert("Cập nhật thành công");
        nav(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTasksId = async (taskId, reset) => {
    try {
      const data = await getTaskId(taskId);
      reset(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (taskId) getTasksId(taskId, reset);
  }, [taskId, reset]);
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
            {!taskId ? "Thêm nhiệm vụ" : "Chỉnh sửa nhiệm vụ"}
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
              {!taskId ? "Thêm mới" : "Cập nhật"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormTask;

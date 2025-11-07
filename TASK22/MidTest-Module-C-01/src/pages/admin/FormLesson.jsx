import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import z from "zod";
import { createLesson, getLessonId, updateLesson } from "../../api/apiLesson";
import { useEffect } from "react";

const lessonSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "Tên bài học không được để trống" })
    .min(6, { message: "Tên bài học tối thiểu 6 kí tự" }),
  content: z.string().optional(),
});

const FormLesson = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(lessonSchema) });
  const nav = useNavigate();
  const { lessonId, courseId } = useParams();

  const onSubmit = async (data) => {
    try {
      if (courseId && !lessonId) {
        const newData = {
          ...data,
          courseId: courseId,
        };
        await createLesson(newData);
        alert("Thêm mới thành công");
        reset();
        nav(-1);
      }
      if (courseId && lessonId) {
        await updateLesson(lessonId, data);
        alert("Cập nhật thành công");
        reset();
        nav(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (lessonId) {
      (async () => {
        const data = await getLessonId(lessonId);
        reset(data);
      })();
    }
  }, [lessonId, reset]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">
              {!lessonId ? "Thêm bài học mới" : "Cập nhật bài học"}
            </h1>
            <button
              onClick={() => nav(-1)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200 font-medium"
            >
              ← Quay lại
            </button>
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
                Tên bài học <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                {...register("title", { required: true })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none"
                placeholder="Nhập tên bài học..."
              />
              {errors.title && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.title.message}
                </span>
              )}
            </div>

            {/* Content Field */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Nội dung bài học
              </label>
              <textarea
                id="content"
                rows="8"
                {...register("content")}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none resize-none"
                placeholder="Nhập nội dung chi tiết của bài học..."
              ></textarea>
              {errors.content && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.content.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02] transition duration-200 shadow-lg"
              >
                {!lessonId ? "✓ Thêm mới" : "✓ Cập nhật"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormLesson;

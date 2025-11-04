import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import z from "zod";
import { createLesson, getLessonId, updateLesson } from "../../api/apiLesson";
import { useEffect } from "react";

const lessonSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "Tên khóa học không được để trống" })
    .min(6, { message: "Tên khóa học tối thiểu 6 kí tự" }),

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
    // console.log(data);
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
    <div>
      <button onClick={() => nav(-1)}>Quay lại</button>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="">Tên bài học</label>
          <input type="text" {...register("title", { required: true })} />
          {errors.title && <span>{errors.title.message}</span>}
        </div>

        <div>
          <label htmlFor="">Nội dung bài học</label>
          <textarea name="" id="" {...register("content")}></textarea>
          {errors.content && <span>{errors.content.message}</span>}
        </div>

        <button>{!lessonId ? "Thêm mới" : "Cập nhật"}</button>
      </form>
    </div>
  );
};

export default FormLesson;

import { useForm } from "react-hook-form";
import { createCourse, getCourseId, updateCourse } from "../../api/apiCourse";
import { useNavigate, useParams } from "react-router-dom";
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
    // console.log(data);
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
    <div>
      <button onClick={() => nav(-1)}>Quay lại</button>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="">Tên khóa học</label>
          <input type="text" {...register("title", { required: true })} />
          {errors.title && <span>{errors.title.message}</span>}
        </div>

        <div>
          <label htmlFor="">Mô tả khóa học</label>
          <textarea name="" id="" {...register("description")}></textarea>
          {errors.description && <span>{errors.description.message}</span>}
        </div>
        <div>
          <label htmlFor="">Giá</label>
          <input
            type="number"
            {...register("price", { required: true, valueAsNumber: true })}
          />
          {errors.price && <span>{errors.price.message}</span>}
        </div>

        <button>{!id ? "Thêm mới" : "Cập nhật"}</button>
      </form>
    </div>
  );
};

export default FormCourse;

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { postLogin, postRegister } from "../../api/apiAuth";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginPage = () => {
  const loginSchema = z.object({
    email: z.string().email({ message: "phải đúng định dạng email" }),
    password: z.string().min(6, { message: "phải có ít nhất 6 ký tự" }),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });
  const nav = useNavigate();
  const onSubmit = async (data) => {
    try {
      const res = await postLogin(data);
      alert("Đăng nhập thành công");
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("user", JSON.stringify(res.user));
      reset();
      nav("/admin/courses");
    } catch (error) {
      reset();
      alert(error.response.data);
      console.log(error);
    }
    // console.log(data);
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="">Email</label>
          <input type="email" {...register("email", { required: true })} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <button>Đăng nhập</button>
      </form>
      <p>
        Chưa có tài khoản <Link to={"/auth/register"}>Đăng ký</Link>{" "}
      </p>
    </div>
  );
};

export default LoginPage;

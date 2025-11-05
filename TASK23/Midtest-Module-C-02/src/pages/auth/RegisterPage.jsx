import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { postRegister } from "../../api/apiAuth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterPage = () => {
  const registerSchema = z.object({
    email: z.string().email({ message: "Phải đúng định dạng email" }),
    password: z
      .string()
      .min(6, { message: "Password phải có ít nhất 6 ký tự" }),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });
  const nav = useNavigate();
  const onSubmit = async (data) => {
    try {
      const newData = {
        ...data,
        role: "member",
      };
      await postRegister(newData);
      alert("Đăng ký thành công");
      nav("/auth/login");
      //   console.log(newData);
    } catch (error) {
      reset();
      alert(error.response.data);
      console.log(error);
    }
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

        <button>Đăng ký</button>
      </form>

      <p>
        Đã có tài khoản <Link to={"/auth/login"}>Đăng nhập</Link>
      </p>
    </div>
  );
};

export default RegisterPage;

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
      const newData = { ...data, role: "member" };
      await postRegister(newData);
      alert("Đăng ký thành công");
      nav("/auth/login");
    } catch (error) {
      reset();
      alert(error.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Đăng ký</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-3 border rounded-lg mt-1"
              placeholder="Nhập email..."
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full p-3 border rounded-lg mt-1"
              placeholder="Nhập password..."
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <button className="w-full bg-green-600 text-white py-3 rounded-lg shadow hover:bg-green-700 transition-all">
            Đăng ký
          </button>
        </form>

        <p className="mt-4 text-center">
          Đã có tài khoản?{" "}
          <Link to="/auth/login" className="text-blue-600 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

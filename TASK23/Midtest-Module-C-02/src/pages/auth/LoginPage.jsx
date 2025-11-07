import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { postLogin } from "../../api/apiAuth";

const LoginPage = () => {
  const loginSchema = z.object({
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
  } = useForm({ resolver: zodResolver(loginSchema) });

  const nav = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await postLogin(data);
      alert("Đăng nhập thành công");
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("user", JSON.stringify(res.user));
      nav("/admin/products");
    } catch (error) {
      reset();
      alert(error.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Đăng nhập</h1>

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
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
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
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition-all">
            Đăng nhập
          </button>
        </form>

        <p className="mt-4 text-center">
          Chưa có tài khoản?{" "}
          <Link to="/auth/register" className="text-blue-600 hover:underline">
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

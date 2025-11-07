import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import { postLogin } from "../../api/apiAuth";
const registerSchema = z.object({
  email: z.string().email({ message: "Phải đúng định dạng email" }),
  password: z
    .string()
    .min(6, { message: "Tối thiểu password phải có 6 ký tự" }),
});
const LoginPage = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data) => {
    try {
      const res = await postLogin(data);
      alert("Đăng nhập thành công");
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("user", JSON.stringify(res.user));
      nav("/admin/projects");
    } catch (error) {
      reset();
      alert(error.response.data);
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">
          Đăng nhập
        </h2>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Email</label>
          <input
            type="text"
            {...register("email", { required: true })}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.password && (
            <span className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </span>
          )}
        </div>

        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
          Đăng nhập
        </button>

        <div className="text-center mt-3 text-sm">
          Chưa có tài khoản?{" "}
          <Link
            to="/auth/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Đăng ký ngay
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

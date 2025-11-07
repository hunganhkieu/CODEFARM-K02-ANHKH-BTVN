import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { postRegister } from "../../api/apiAuth";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const RegisterPage = () => {
  const registerSchema = z.object({
    email: z.string().email({ message: "phải đúng định dạng email" }),
    password: z.string().min(6, { message: "phải có ít nhất 6 ký tự" }),
    fullname: z
      .string()
      .nonempty({ message: "Fullname không được để trống" })
      .min(6, { message: "Fullname phải có ít nhất 6 ký tự" }),
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
        role: "student",
      };
      await postRegister(newData);
      alert("Đăng ký thành công");
      reset();
      nav("/auth/login");
    } catch (error) {
      reset();
      alert(error.response.data);
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Đăng ký</h2>
            <p className="text-gray-500 mt-2">Tạo tài khoản mới của bạn</p>
          </div>

          {/* Form */}
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: true })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none"
                placeholder="example@email.com"
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", { required: true })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none"
                placeholder="••••••••"
              />
              {errors.password && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Fullname Field */}
            <div className="mb-5">
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Fullname
              </label>
              <input
                type="text"
                id="fullname"
                {...register("fullname", { required: true })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none"
                placeholder="Nguyễn Văn A"
              />
              {errors.fullname && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.fullname.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02] transition duration-200 shadow-lg"
            >
              Đăng ký
            </button>
          </form>

          {/* Footer */}
          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-gray-600">
              Đã có tài khoản?{" "}
              <Link
                to="/auth/login"
                className="text-purple-600 font-semibold hover:text-purple-800 transition duration-200"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

import { z } from "zod";

export const productSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "Tên sản phẩm không được để trống" })
    .min(3, { message: "Tên sản phẩm tối thiểu phải có 3 ký tự" }),
  price: z
    .number({ message: "Giá không được để trống" })
    .min(0, { message: "Price phải lớn hơn hoặc bằng 0" }),
  categoryId: z.coerce.number().min(1, { message: "Phải chọn danh mục" }),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  stock: z
    .number({ message: "Tòn không được để trống" })
    .min(0, { message: "Số lượng trong kho phải lớn hơn hoặc bằng 0" }),
});

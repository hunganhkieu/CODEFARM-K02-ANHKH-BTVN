import Category from "../models/Category.js";
import createError from "../utils/createError.js";
import createResponse from "../utils/createResponse.js";
import handleAsync from "../utils/handleAsync.js";

export const createCategory = handleAsync(async (req, res) => {
  const caterogy = await Category.create(req.body);
  createResponse(res, 201, "Thêm danh mục thành công", caterogy);
});

export const getCategories = handleAsync(async (req, res) => {
  const data = await Category.find();
  if (data.length === 0) {
    createError(res, 404, "Not found", data);
  }
  createResponse(res, 200, "lấy danh sách thành công", data);
});

export const updateCategory = handleAsync(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  createResponse(res, 200, "Cập nhật danh mục thành công", category);
});

export const removeCategory = handleAsync(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    createError(res, 404, "Not found");
  }
  createResponse(res, 200, "Xóa danh mục thành công", category);
});

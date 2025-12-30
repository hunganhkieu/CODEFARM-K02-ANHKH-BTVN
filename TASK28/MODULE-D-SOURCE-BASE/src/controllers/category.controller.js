import Category from "../models/Category.js";
import createError from "../utils/createError.js";
import createResponse from "../utils/createResponse.js";
import handleAsync from "../utils/handleAsync.js";

export const createCategory = handleAsync(async (req, res) => {
  const cate = await Category.create({
    ...req.body,
    createdBy: req.user._id,
  });
  createResponse(res, 201, "Create successfully", cate);
});

export const getCategorys = handleAsync(async (req, res) => {
  const query = {
    createdBy: req.user._id,
  };

  const data = await Category.find(query);
  if (data.length === 0) {
    return createError(res, 404, "Not found");
  }

  createResponse(res, 200, "Successfully", data);
});

export const getCateById = handleAsync(async (req, res) => {
  const data = await Category.findOne({
    _id: req.params.id,
    createdBy: req.user._id,
  });

  if (!data) {
    return createError(res, 404, "Not found or no permission");
  }

  return createResponse(res, 200, "Successfully", data);
});
export const updateCategory = handleAsync(async (req, res) => {
  const data = await Category.findOneAndUpdate(
    {
      _id: req.params.id,
      createdBy: req.user._id,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!data) {
    return createError(res, 404, "Not found or no permission");
  }

  return createResponse(res, 200, "Update successfully", data);
});

export const removeCategory = handleAsync(async (req, res) => {
  const data = await Category.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user._id,
  });
  if (!data) {
    return createError(res, 400, "Not found or no permission");
  }
  return createResponse(res, 200, "Remove successfully!", data);
});

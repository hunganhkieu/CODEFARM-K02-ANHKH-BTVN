import Todo from "../models/Todo.js";
import createError from "../utils/createError.js";
import createResponse from "../utils/createResponse.js";
import handleAsync from "../utils/handleAsync.js";

export const createTodo = handleAsync(async (req, res) => {
  const todo = await Todo.create({ ...req.body, createdBy: req.user._id });
  createResponse(res, 201, "Create successfully", todo);
});

export const getTodos = handleAsync(async (req, res) => {
  const { search, isCompleted, priority } = req.query;
  const query = {
    createdBy: req.user._id,
  };

  if (search) {
    query.name = {
      $regex: search,
      $options: "i",
    };
  }

  if (isCompleted !== undefined) {
    if (isCompleted == "true") {
      query.isCompleted = true;
    } else {
      query.isCompleted = false;
    }
  }

  if (priority) {
    query.priority = priority;
  }
  const data = await Todo.find(query).populate("category");
  if (data.length === 0) {
    return createError(res, 404, "Not found");
  }

  createResponse(res, 200, "Successfully", data);
});

export const getTodoById = handleAsync(async (req, res) => {
  const data = await Todo.findOne({
    _id: req.params.id,
    createdBy: req.user._id,
  }).populate("category");

  if (!data) {
    return createError(res, 404, "Not found or no permission");
  }

  return createResponse(res, 200, "Successfully", data);
});

export const updateTodo = handleAsync(async (req, res) => {
  const data = await Todo.findOneAndUpdate(
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

export const removeTodo = handleAsync(async (req, res) => {
  const data = await Todo.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user._id,
  });
  if (!data) {
    return createError(res, 400, "Not found or no permission");
  }
  return createResponse(res, 200, "Remove successfully!", data);
});

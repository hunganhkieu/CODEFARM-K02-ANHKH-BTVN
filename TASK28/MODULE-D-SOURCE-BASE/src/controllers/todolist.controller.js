import Todolist from "../models/TodoList.js";
import createError from "../utils/createError.js";
import createResponse from "../utils/createResponse.js";
import handleAsync from "../utils/handleAsync.js";

export const createTodolist = handleAsync(async (req, res) => {
  console.log(req.user);
  const todolist = await Todolist.create({ ...req.body, user: req.user._id });
  console.log(todolist);
  createResponse(res, 200, "thanh cong", todolist);
});

export const getAllTodolist = handleAsync(async (req, res) => {
  const { search, isComplete, priority, page, limit } = req.query;
  const skip = (page - 1) * limit;
  const query = {
    user: req.user._id,
  };
  console.log(query);
  if (search) {
    query.name = {
      $regex: search,
      $options: "i",
    };
  }
  if (isComplete !== undefined) {
    if (isComplete == "true") {
      query.isComplete = true;
    } else {
      query.isComplete = false;
    }
  }
  if (priority) {
    query.priority = priority;
  }
  console.log(query);
  const todolist = await Todolist.find(query)
    .populate("category")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  createResponse(res, 200, "thanh cong", todolist);
});

export const getTodolistById = handleAsync(async (req, res) => {
  const todolist = await Todolist.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).populate("category");

  if (!todolist) {
    return createError(res, 404, "Not Found");
  }

  createResponse(res, 200, "thanh cong", todolist);
});

export const UpdateTodolistById = handleAsync(async (req, res) => {
  const todolist = await Todolist.findByIdAndUpdate(
    {
      _id: req.params.id,
      user: req.user._id,
    },
    req.body,
    { new: true }
  );
  if (!todolist) {
    return createError(res, 400, "Not Found");
  }
  createResponse(res, 200, "thanh cong", todolist);
});
export const RemoveTodolistById = handleAsync(async (req, res) => {
  const todolist = await Todolist.findByIdAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!todolist) {
    return createError(res, 400, "Not Found");
  }
  createResponse(res, 200, "thanh cong", todolist);
});

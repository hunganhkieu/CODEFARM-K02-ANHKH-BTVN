import Todo from "../models/Todo.js";
import createError from "../utils/createError.js";
import createResponse from "../utils/createResponse.js";
import handleAsync from "../utils/handleAsync.js";

export const createTodo = handleAsync(async (req, res) => {
  const todo = await Todo.create(req.body);
  createResponse(res, 201, "Thêm công việc thành công", todo);
});

export const getTodos = handleAsync(async (req, res) => {
  const { search, priority } = req.query;
  const query = {
    user: req.user._id,
  };

  if (search) {
    query.name = {
      $regex: search,
      $option: "i",
    };
  }
  if (priority) {
    query.priority = priority;
  }
  const data = await Todo.find(query).populate("category");
  if (data.length === 0) {
    createError(res, 404, "Not found", data);
  }
  createResponse(res, 200, "lấy công việc thành công", data);
});

export const updateTodo = handleAsync(async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  createResponse(res, 200, "Cập nhật công việc thành công", todo);
});

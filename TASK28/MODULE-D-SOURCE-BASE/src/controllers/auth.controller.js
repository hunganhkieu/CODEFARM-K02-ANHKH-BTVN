import { JWT_SECRET } from "../configs/dotenvConfig.js";
import User from "../models/User.js";
import createError from "../utils/createError.js";
import createResponse from "../utils/createResponse.js";
import handleAsync from "../utils/handleAsync.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const signUp = handleAsync(async (req, res) => {
  const { userName, email, password } = req.body;
  const userExit = await User.findOne({ email });
  if (userExit) return createError(res, 400, "Email đã tồn tại", userExit);

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const user = await User.create({ userName, email, password: hash });
  user.password = undefined;
  createResponse(res, 201, "Đăng ký thành công", user);
});

export const signIn = handleAsync(async (req, res) => {
  const { email, password } = req.body;
  const userExit = await User.findOne({ email });
  if (!userExit)
    return createError(res, 400, "Email hoặc mật khẩu sai", userExit);

  const accessPassword = bcrypt.compareSync(password, userExit.password);
  if (!accessPassword) return createError(res, 400, "Emai hoặc mật khẩu sai");

  const token = jwt.sign({ _id: userExit._id }, JWT_SECRET);

  createResponse(res, 200, "Đăng nhập thành công", {
    user: userExit,
    token,
  });
});

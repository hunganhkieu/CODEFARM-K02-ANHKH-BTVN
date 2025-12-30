import { JWT_SECRET } from "../configs/dotenvConfig.js";
import User from "../models/User.js";
import createError from "../utils/createError.js";
import createResponse from "../utils/createResponse.js";
import handleAsync from "../utils/handleAsync.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const signUp = handleAsync(async (req, res) => {
  const { email, password, fullName } = req.body;
  const userExits = await User.findOne({ email });
  if (userExits) return createError(res, 400, "Email đã tồn tại");

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const user = await User.create({ email, password: hash, fullName });
  user.password = undefined;

  createResponse(res, 201, "Đăng ký thành công", user);
});

export const signIn = handleAsync(async (req, res) => {
  const { email, password } = req.body;
  const userExits = await User.findOne({ email });
  if (!userExits)
    return createError(res, 400, "Email hoặc mật khẩu không đúng");
  const isMatch = bcrypt.compareSync(password, userExits.password);
  if (!isMatch) return createError(res, 400, "Email hoặc mật khẩu không đúng");

  const accessToken = jwt.sign({ _id: userExits._id }, JWT_SECRET);

  createResponse(res, 200, "Đăng nhập thành công", {
    user: userExits,
    accessToken,
  });
});

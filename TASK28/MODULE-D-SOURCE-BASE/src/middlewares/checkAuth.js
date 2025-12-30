import { JWT_SECRET } from "../configs/dotenvConfig.js";
import User from "../models/User.js";
import createError from "../utils/createError.js";
import jwt from "jsonwebtoken";
export const checkAuth = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) return createError(res, 400, "Bạn cần đăng nhập");
  const accessToken = jwt.verify(token, JWT_SECRET);
  const userExit = await User.findById(accessToken._id);
  req.user = userExit;
  next();
};

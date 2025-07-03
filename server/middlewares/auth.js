import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  // If no token is found
  if (!token) {
    return next(new ErrorHandler("User is not authenticated.", 401));
  }

  // Verify the token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return next(new ErrorHandler("Invalid or expired token.", 401));
  }

  // Fetch user from DB
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new ErrorHandler("User does not exist.", 404));
  }

  // Attach user to the request
  req.user = user;
  next();
});

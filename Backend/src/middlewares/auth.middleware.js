import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { asyncHandler, ApiError } from "../utils/allUtils.js";

const authUser = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies.token ||
    (req.headers.authorization && req.headers.authorization.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (!token) {
    throw new ApiError(401, "Not authorized, no token found");
  }
  const isBlacklisted=await userModel.findOne({token:token});
  if(isBlacklisted){
    throw new ApiError(401, "Not authorized, token blacklisted");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    throw new ApiError(401, "Not authorized, token failed");
  }
});

export { authUser };

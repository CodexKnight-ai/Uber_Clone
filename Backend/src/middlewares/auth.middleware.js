import jwt from "jsonwebtoken";
import { asyncHandler, ApiError } from "../utils/allUtils.js";
import {BlacklistToken} from "../models/blacklistToken.model.js";
import { userModel } from "../models/user.model.js";
import { captainModel } from "../models/captain.model.js";

const authUser = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies.token ||
    (req.headers.authorization && req.headers.authorization.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (!token) {
    throw new ApiError(401, "User not authorized, no token found");
  }

  // Check if token is blacklisted
  const isBlacklisted = await BlacklistToken.findOne({ token });
  if (isBlacklisted) {
    throw new ApiError(401, "User not authorized, token blacklisted");
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
    console.error("User authentication error:", error);
    throw new ApiError(401, "User not authorized, token failed or expired");
  }
});

const authCaptain = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies.token ||
    (req.headers.authorization?.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (!token) {
    throw new ApiError(401, "Captain not authorized, no token found");
  }

  // Check if token is blacklisted
  const isBlacklisted = await BlacklistToken.findOne({ token });
  if (isBlacklisted) {
    throw new ApiError(401, "Captain not authorized, token blacklisted");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);

    if (!captain) {
      throw new ApiError(404, "Captain not found");
    }

    req.captain = captain; // Attach captain to the request
    next();
  } catch (error) {
    console.error("Captain authentication error:", error);
    throw new ApiError(401, "Captain not authorized, token failed or expired");
  }
});

export { authUser, authCaptain };

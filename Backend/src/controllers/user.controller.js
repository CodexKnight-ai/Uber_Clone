import { userModel } from "../models/user.model.js";
import { validationResult } from "express-validator";
import { BlacklistToken } from "../models/blacklistToken.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../utils/allUtils.js";

const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array());
  }

  const { fullname, email, password } = req.body || {};
  console.log("Request body:", req.body);

  if (!fullname?.firstname || !fullname?.lastname || !email || !password) {
    throw new ApiError(400, "Please fill all the fields");
  }
  const isUserExist = await userModel.findOne({ email });
  if (isUserExist) {
    throw new ApiError(400, "User already exists with this email");
  }
  const hashedPassword = await userModel.hashPassword(password);

  const user = await userModel.create({
    id: new Date().getTime().toString(),
    fullname: {
      firstname: fullname.firstname,
      lastname: fullname.lastname,
    },
    email,
    password: hashedPassword,
  });

  if (!user.generateAuthToken) {
    throw new ApiError(500, "Token generation method not found on user object");
  }
  const token = user.generateAuthToken();

  res
    .status(201)
    .json(
      new ApiResponse(201, { token, user }, "User registered successfully")
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }
  const token = user.generateAuthToken();

  res.cookie("token", token);
  res.status(201).json(new ApiResponse(200, { token, user }, "User logged in"));
});

const getUserProfile = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User profile fetched successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];
  await BlacklistToken.create({ token });
  res.status(200).json(new ApiResponse(200, {}, "User logged out"));
});

export { registerUser, loginUser, getUserProfile,logoutUser };

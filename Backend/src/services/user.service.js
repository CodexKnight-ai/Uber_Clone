import { userModel } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body || {};
  console.log('Request body:', req.body);

  if (!fullname?.firstname || !fullname?.lastname || !email || !password) {
    throw new ApiError(400, 'Please fill all the fields');
  }

  const user = await userModel.create({
    fullname: {
      firstname: fullname.firstname,
      lastname: fullname.lastname,
    },
    email,
    password,
  });

  res.status(201).json(new ApiResponse(201, 'User created successfully', user));
});


export { createUser };

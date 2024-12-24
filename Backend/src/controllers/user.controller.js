import { userModel } from "../models/user.model.js";
import { validationResult } from "express-validator";
import { ApiError, ApiResponse, asyncHandler } from "../utils/allUtils.js";

const registerUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(400, errors.array());
    }

    const { fullname, email, password } = req.body || {};
    console.log('Request body:', req.body);
  
    if (!fullname?.firstname || !fullname?.lastname || !email || !password) {
      throw new ApiError(400, 'Please fill all the fields');
    }
    const hashedPassword = await userModel.hashPassword(password);

    const user = await userModel.create({
        id: new Date().getTime().toString(),
        fullname: {
          firstname: fullname.firstname,
          lastname: fullname.lastname,
        },
        email,
        password:hashedPassword,
      });
    
    if (!user.generateAuthToken) {
        throw new ApiError(500, "Token generation method not found on user object");
    }
    const token = user.generateAuthToken();

    res.status(201).json(new ApiResponse(201, { token, user }));
});

export { registerUser };

import { userModel } from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import {ApiError,ApiResponse,asyncHandler} from "../utils/allUtils.js";

const registerUser=asyncHandler(async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        throw new ApiError(400,errors.array());
    }
    const {firstname,lastname,email,password}=req.body;
    const hashedPassword=await userModel.hashPassword(password);
    const user= createUser({
        firstname,
        lastname,
        email,
        password:hashedPassword,
    });
    const token=user.generateAuthToken();
    return new ApiResponse(201,{token,user});

})
export {registerUser}

import { captainModel } from "../models/captain.model.js";
import { validationResult } from "express-validator";
import { asyncHandler, ApiResponse, ApiError } from "../utils/allUtils.js";
import { BlacklistToken } from "../models/blacklistToken.model.js";

const registerCaptain = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array());
  }

  const { email, fullname, password, vehicle } = req.body;

  const isCaptainExist = await captainModel.findOne({ email });
  if (isCaptainExist) {
    throw new ApiError(400, "Captain already exists with this email");
  }

  if (
    !vehicle ||
    !vehicle.color ||
    !vehicle.plate ||
    !vehicle.capacity ||
    !vehicle.vehicleType
  ) {
    throw new ApiError(400, "Vehicle information is incomplete");
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await captainModel.create({
    email,
    fullname: {
      firstname: fullname.firstname,
      lastname: fullname.lastname,
    },
    password: hashedPassword,
    vehicle: {
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    },
  });

  const token = captain.generateAuthToken();
  res.status(201).json(
    new ApiResponse(true, "Captain registered successfully", {
      captain,
      token,
    })
  );
});

const loginCaptain = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(400, errors.array());
  }
  const { email, password } = req.body;
  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain || !(await captain.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }
  const token = captain.generateAuthToken();
  res.cookie("token", token);
  res
    .status(200)
    .json(new ApiResponse(true, "Captain logged in", { captain, token }));
});
const getCaptainProfile = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(true, "Captain profile fetched successfully", req.captain)
    );
});

const logoutCaptain=asyncHandler(async(req,res)=>{
  const token=req.cookies.token||req.headers.authorization.split(" ")[1];
  res.clearCookie("token");
  await BlacklistToken.create({token});
  res.status(200).json(new ApiResponse(true,"Captain logged out"));
});

export { registerCaptain, loginCaptain, getCaptainProfile,logoutCaptain };

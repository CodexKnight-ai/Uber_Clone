import { captainModel } from "../models/captain.model.js";
import { validationResult } from "express-validator";
import { asyncHandler, ApiResponse, ApiError } from "../utils/allUtils.js";

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
  res
    .status(201)
    .json(
      new ApiResponse(true, "Captain registered successfully", {
        captain,
        token,
      })
    );
});

export { registerCaptain };

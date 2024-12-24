import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { asyncHandler } from "../utils/asyncHandler.js";
const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name should be atleast 3 characters long"],
    },
    lastname: {
      type: String,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    minlength: [6, "Email should be atleast 6 characters long"],
  },
  password: {
    type: String,
    required: true,
    minlength: [4, "Password should be atleast 6 characters long"],
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
    },
    plate: {
      type: String,
      required: true,
      minlength: [4, "Plate number should be atleast 4 characters long"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity should be atleast 1"],
    },
    vehicleType: {
      type: String,
      enum: ["scooter", "bike", "car", "van", "auto"],
      required: true,
    },
    location: {
      lat: {
        type: Number,
        // required: true,
      },
      long: {
        type: Number,
        // required: true,
      },
    },
  },
});
captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};
captainSchema.comparePassword = asyncHandler(async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
});
captainSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const captainModel = mongoose.model("Captain", captainSchema);

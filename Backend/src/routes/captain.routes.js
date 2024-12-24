import express, { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { registerCaptain } from "../controllers/captain.controller.js";
import { body } from "express-validator";

const router=express.Router();

router.post("/register",[
    body("email").isEmail().withMessage("Enter a valid email"),
    body("fullname.firstname").isLength({min:3}).withMessage("First name should be atleast 3 characters long"),
    body("password").isLength({min:6}).withMessage("Password should be atleast 6 characters long"),
    body("vehicle.color").isLength({min:3}).withMessage("Color should be atleast 3 characters long"),
    body("vehicle.plate").isLength({min:4}).withMessage("Plate number should be atleast 4 characters long"),
    body("vehicle.capacity").isNumeric().withMessage("Capacity should be a number"),
    body("vehicle.vehicleType").isIn(["scooter","bike","car","van","auto"]).withMessage("Invalid vehicle type"),
    // body("vehicle.location.lat").isNumeric().withMessage("Latitude should be a number"),
    // body("vehicle.location.long").isNumeric().withMessage("Longitude should be a number")
],registerCaptain);

export default router;
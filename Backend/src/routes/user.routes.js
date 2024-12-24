import express from "express";
import body from "express-validator";
import userController from "../controllers/user.controller.js";
const router = express.Router();

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name should be atleast 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password should be atleast 6 characters long"),
  ],
  userController.registerUser
);

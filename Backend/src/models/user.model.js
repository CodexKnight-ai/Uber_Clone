import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
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
    minlength: [6, "Email should be atleast 6 characters long"],
  },
  password:{
    type: String,
    required: true,
    minlength: [4, "Password should be atleast 6 characters long"],
    select:false,
  },
  socketId:{
    type:String,
  },
});
userSchema.methods.generateAuthToken = function () {
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET);
    return token;
};
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};
export const userModel=mongoose.model("User",userSchema);  
import mongoose from "mongoose";
import type { User } from "../../domain/entities/User.js";

const userShchema = new mongoose.Schema<User>({
  name: String,
  email: String,
  password: String,
  role:{
    type: String,
    default: "USER"
  },
  createdAt: Date,
  updatedAt: Date,
});

export const Users = mongoose.model("User", userShchema);

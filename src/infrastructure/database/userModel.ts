import mongoose from "mongoose";

import type { User } from "../../domain/entities/User.js";

const userShchema = new mongoose.Schema<User>(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
      default: "USER",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Users = mongoose.model("User", userShchema);

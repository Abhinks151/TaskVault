import express from "express";
import type { IUserController } from "../controllerInterface/IUserController.js";

export function userRoute(userController: IUserController) {
  const userRouter = express.Router();

  userRouter.post("/update", userController.upadteUserDetails.bind(userController))

  return userRouter;
}

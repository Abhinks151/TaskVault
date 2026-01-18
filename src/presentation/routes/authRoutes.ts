import express from "express";
import type { IUserController } from "../controllerInterface/IUserController.js";

export function authRoute(authController: IUserController) {
  const authRouter = express.Router();

  authRouter.post(
    "/register",
    authController.handleRegister.bind(authController),
  );

  authRouter.post("/login", authController.handleLogin.bind(authController));

  return authRouter;
}

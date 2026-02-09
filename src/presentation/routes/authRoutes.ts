import express from "express";

import type { IAuthController } from "../controllerInterface/IAuthController.js";

export function authRoute(authController: IAuthController) {
  const authRouter = express.Router();

  authRouter.post(
    "/register",
    authController.handleRegister.bind(authController),
  );

  authRouter.post("/login", authController.handleLogin.bind(authController));

  return authRouter;
}

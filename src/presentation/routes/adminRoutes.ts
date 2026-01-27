import express from "express";
import type { IAdminController } from "../controllerInterface/IAdminController.js";

export function adminRoute(authController: IAdminController) {
  const adminRouter = express.Router();

  adminRouter.get(
    "/all",
    authController.handleAdmin.bind(authController),
  );


  return adminRouter;
}

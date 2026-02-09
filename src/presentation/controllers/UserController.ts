import type { Request, Response } from "express";

import type { IUpdateUserDetailsUsecase } from "../../application/interfaces/use-cases/IUpdateUserDetailsUsecase.js";
import type { IUserController } from "../controllerInterface/IUserController.js";

export class UserController implements IUserController {
  constructor(private updateUserUsecase: IUpdateUserDetailsUsecase) {}

  async upadteUserDetails(req: Request, res: Response): Promise<void> {
    try {
      //   const userId = req.params.id;
      const userId = req.user?.id;
      if (!userId) {
        throw new Error("User id is required");
      }
      const { name, email } = req.body;

      const user = await this.updateUserUsecase.execute(userId, name, email);

      res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      console.log("update user details failed",error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

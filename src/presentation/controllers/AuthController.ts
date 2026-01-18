import type { Request, Response } from "express";
import type { IRegisterUserUsecase } from "../../application/usecases/auth/IRegisterUserUsecase.js";
import type { IUserController } from "../controllerInterface/IUserController.js";

export class AuthController implements IUserController {
  constructor(private registerUserUsecase: IRegisterUserUsecase) {}

  async handleRegister(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      const user = await this.registerUserUsecase.execute(name, email, password);

      res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "User registration failed" });
    }
  }
}

import type { Request, Response } from "express";
import type { IRegisterUserUsecase } from "../../application/usecases/auth/IRegisterUserUsecase.js";
import type { IUserController } from "../controllerInterface/IUserController.js";
import type { ILoginUserUsecase } from "../../application/usecases/auth/IloginUserusecase.js";

export class AuthController implements IUserController {
  constructor(
    private registerUserUsecase: IRegisterUserUsecase,
    private loginUserUsecase: ILoginUserUsecase,
  ) {}

  async handleRegister(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      const user = await this.registerUserUsecase.execute(
        name,
        email,
        password,
      );

      res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "User registration failed" });
    }
  }

  async handleLogin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this.loginUserUsecase.execute(email, password);

      res.status(200).json({ message: "Login successfull", token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "User login failed" });
    }
  }
}

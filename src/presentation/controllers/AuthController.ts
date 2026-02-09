import type { Request, Response } from "express";

import type { IRegisterUserUsecase } from "../../application/interfaces/use-cases/IRegisterUserUsecase.js";
import type { IAuthController } from "../controllerInterface/IAuthController.js";
import type { ILoginUserUsecase } from "../../application/interfaces/use-cases/IloginUserusecase.js";

export class AuthController implements IAuthController {
  constructor(
    private registerUserUsecase: IRegisterUserUsecase,
    private loginUserUsecase: ILoginUserUsecase,
  ) {
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

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

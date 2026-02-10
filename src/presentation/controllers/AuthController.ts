import type { Request, Response } from "express";

import type { IRegisterUserUsecase } from "../../application/interfaces/use-cases/IRegisterUserUsecase.js";
import type { IAuthController } from "../controllerInterface/IAuthController.js";
import type { ILoginUserUsecase } from "../../application/interfaces/use-cases/IloginUserusecase.js";
import type { IRefreshTokenUsecase } from "../../application/interfaces/use-cases/IRefreshTokenUsecase.js";

export class AuthController implements IAuthController {
  constructor(
    private registerUserUsecase: IRegisterUserUsecase,
    private loginUserUsecase: ILoginUserUsecase,
    private refreshTokenUsecase: IRefreshTokenUsecase,
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
      
      const { accessToken, refreshToken } = await this.loginUserUsecase.execute(email, password);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true, 
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, 
        path: "/",
      });

      res.status(200).json({ 
        message: "Login successful", 
        accessToken 
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "User login failed" });
    }
  }

  async handleRefresh(req: Request, res: Response): Promise<void> {
    try {
      const refreshToken = req.cookies.refreshToken;

      const accessToken = await this.refreshTokenUsecase.execute(refreshToken);

      res.status(200).json({
        message: "Token refreshed",
        accessToken,
      });
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Unauthorized: Please login again" });
    }
  }
}

import type { Request, Response } from "express";

export interface IAuthController {
  handleRegister(req: Request, res: Response): Promise<void>;
  handleLogin(req: Request, res: Response): Promise<void>;
  handleRefresh(req: Request, res: Response): Promise<void>;
}

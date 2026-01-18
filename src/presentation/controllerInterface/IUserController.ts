import type { Request, Response } from "express";

export interface IUserController {
  handleRegister(req: Request, res: Response): Promise<void>;
}

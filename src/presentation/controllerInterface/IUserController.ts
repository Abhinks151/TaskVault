import type { Request, Response } from "express";

export interface IUserController {
  upadteUserDetails(req: Request, res: Response): Promise<void>;
}

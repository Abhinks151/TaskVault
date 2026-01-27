import type { Request, Response } from "express";


export interface IAdminController {
  handleAdmin(req: Request, res: Response): Promise<void>;
}
import type { Request, Response } from "express";

import type { IAdminUsecase } from "../../application/interfaces/use-cases/IAdminUsecase.js";
import type { IAdminController } from "../controllerInterface/IAdminController.js";

export class AdminController implements IAdminController {
  constructor(private adminUsecase: IAdminUsecase) {}

  async handleAdmin(req: Request, res: Response): Promise<void> {
    const result = await this.adminUsecase.execute();

    res.json({ message: "Admin all data", result });
  }
}

import type { NextFunction, Request, Response } from "express";
import type { ITokenService } from "../../application/interfaces/use-cases/ITokenService.js";

// closure
export function authMiddleware(tokenService: ITokenService) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ message: "token missing " });
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    try {
      const user = tokenService.verifyToken(token);

      (req as any).user = {
        id: user.userId,
        role: user.role,
      };

      console.log(req.user);


      next();
    } catch {
      res.status(401).json({ message: "Invalid or expired token" });
    }
  };
}

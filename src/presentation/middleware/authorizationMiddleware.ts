import type { NextFunction, Request, Response } from "express";

export function authorizationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.user?.role === "ADMIN") {
    next();
    return;
  }
  res.status(401).json({ message: "Cannot access" });
}

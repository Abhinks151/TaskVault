import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import type { ITokenService } from "../../application/interfaces/use-cases/ITokenService.js";

dotenv.config();

export class TockenService implements ITokenService {
  private readonly SECRET = process.env.SECRET!;
  private readonly EXPIRES_IN = process.env.EXPIRES_IN!;

  generateToken(payload: { userId: string; role: string }): string {
    return jwt.sign(
      {
        userId: payload.userId,
        role: payload.role,
      },
      this.SECRET,
      {
        expiresIn: this.EXPIRES_IN as any,
      },
    );
  }

  verifyToken(token: string): { userId: string; role: string } {
    const decoded = jwt.verify(token, this.SECRET);
    if (!decoded) {
      throw new Error("Invalid token");
    }

    if (typeof decoded === "string") {
      throw new Error("Invalid token");
    }
    console.log(decoded);

    return {
      userId: decoded.userId,
      role: decoded.role,
    };
  }
}

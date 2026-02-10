import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import type { ITokenService } from "../../application/interfaces/use-cases/ITokenService.js";

dotenv.config();

export class TockenService implements ITokenService {
  private readonly SECRET = process.env.SECRET || "secret";

  private readonly ACCESS_EXPIRES = process.env.ACCESS_EXPIRES_IN || "15m";
  private readonly REFRESH_EXPIRES = process.env.REFRESH_EXPIRES_IN || "1d";

  generateAccessToken(payload: { userId: string; role: string }): string {
    return jwt.sign(payload, this.SECRET, {
      expiresIn: this.ACCESS_EXPIRES as any,
    });
  }

  generateRefreshToken(payload: { userId: string; role: string }): string {
    return jwt.sign(payload, this.SECRET, {
      expiresIn: this.REFRESH_EXPIRES as any,
    });
  }

  verifyAccessToken(token: string): { userId: string; role: string } {
    return this.verify(token, this.SECRET);
  }

  verifyRefreshToken(token: string): { userId: string; role: string } {
    return this.verify(token, this.SECRET);
  }

  // function to verify token  easily
  verify(token: string, secret: string): { userId: string; role: string } {
    const decoded = jwt.verify(token, secret);
    if (!decoded || typeof decoded === "string") {
      throw new Error("Invalid token");
    }
    return {
      userId: decoded.userId,
      role: decoded.role,
    };
  }
}

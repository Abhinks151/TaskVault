import type { ITokenService } from "../../application/usecases/auth/ITokenService.js";
import jwt from "jsonwebtoken";

export class TockenService implements ITokenService {
  private readonly SECRET = "my spoecial secrest";
  private readonly EXPIRES_IN = "1d";

  generateToken(payload: { userId: string; role: string }): string {
    return jwt.sign(
      {
        sub: payload.userId,
        role: payload.role,
      },
      this.SECRET,
      { expiresIn: this.EXPIRES_IN },
    );
  }
}

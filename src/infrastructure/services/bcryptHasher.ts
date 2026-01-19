import * as bcrypt from "bcrypt";
import type { IPasswordService } from "../../application/interfaces/services/IPasswordService.js";

export class BcryptPasswordHasher implements IPasswordService {
  private readonly SALT_ROUNDS = 12;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

import type { IUserRepository } from "../../repositories/IUserRepository.js";
import type { IPasswordService } from "../../services/IPasswordService.js";
import type { ILoginUserUsecase } from "./IloginUserusecase.js";
import type { ITokenService } from "./ITokenService.js";

export class LoginUserUsecase implements ILoginUserUsecase {
  constructor(
    private userRepositotry: IUserRepository,
    private passwordHasher: IPasswordService,
    private tokenService: ITokenService,
  ) {}

  async execute(email: string, password: string): Promise<string> {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const user = await this.userRepositotry.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await this.passwordHasher.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    return this.tokenService.generateToken({
      userId: user?._id,
      role: user.role,
    });
  }
}

import type { IUserRepository } from "../../interfaces/repositories/IUserRepository.js";
import type { IPasswordService } from "../../interfaces/services/IPasswordService.js";
import type {
  ILoginUserUsecase,
  LoginResponse,
} from "../../interfaces/use-cases/IloginUserusecase.js";
import type { ITokenService } from "../../interfaces/use-cases/ITokenService.js";

export class LoginUserUsecase implements ILoginUserUsecase {
  constructor(
    private userRepository: IUserRepository, // Fixed typo from 'userRepositotry'
    private passwordHasher: IPasswordService,
    private tokenService: ITokenService,
  ) {}

  async execute(email: string, password: string): Promise<LoginResponse> {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const user = await this.userRepository.findByEmail(email);
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

    const accessToken = this.tokenService.generateAccessToken({
      userId: user._id!,
      role: user.role,
    });

    const refreshToken = this.tokenService.generateRefreshToken({
      userId: user._id!,
      role: user.role,
    });

    await this.userRepository.update(user._id!, { refreshToken });

    return {
      accessToken,
      refreshToken,
    };
  }
}

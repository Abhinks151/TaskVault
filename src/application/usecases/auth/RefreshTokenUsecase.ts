import type { IUserRepository } from "../../interfaces/repositories/IUserRepository.js";
import type { IRefreshTokenUsecase } from "../../interfaces/use-cases/IRefreshTokenUsecase.js";
import type { ITokenService } from "../../interfaces/use-cases/ITokenService.js";

export class RefreshTokenUsecase implements IRefreshTokenUsecase {
  constructor(
    private userRepository: IUserRepository,
    private tokenService: ITokenService,
  ) {}

  async execute(refreshToken: string): Promise<string> {
    if (!refreshToken) {
      throw new Error("Refresh token is required");
    }

    const decoded = this.tokenService.verifyRefreshToken(refreshToken);

    const user = await this.userRepository.findById(decoded.userId);
    if (!user || !user.refreshToken) {
      throw new Error("User not found or session expired");
    }

    if (user.refreshToken !== refreshToken) {
      throw new Error("Invalid refresh token");
    }

    return this.tokenService.generateAccessToken({
      userId: user._id!,
      role: user.role,
    });
  }
}

import type { IUserRepository } from "../../interfaces/repositories/IUserRepository.js";
import type { IUpdateUserDetailsUsecase } from "../../interfaces/use-cases/IUpdateUserDetailsUsecase.js";

export class UpdateUserDetailsUsecase implements IUpdateUserDetailsUsecase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string, name: string, email: string): Promise<void> {
    try {
      if (!userId) {
        throw new Error("User id is required");
      }

      await this.userRepository.updateUserDetails(userId, name, email);
    } catch (error) {
      console.log(error);
    }
  }
}

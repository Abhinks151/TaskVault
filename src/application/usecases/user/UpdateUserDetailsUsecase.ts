import type { UserCreatedPayload } from "../../../infrastructure/interface/userCreatedQueuePayload.js";
import type { IUserRepository } from "../../interfaces/repositories/IUserRepository.js";
import type { IUpdateUserDetailsUsecase } from "../../interfaces/use-cases/IUpdateUserDetailsUsecase.js";

export class UpdateUserDetailsUsecase implements IUpdateUserDetailsUsecase {
  constructor(
    private userRepository: IUserRepository,
    private enqueueUserUpdated: (payload: UserCreatedPayload) => Promise<void>,
  ) {}

  async execute(userId: string, name: string, email: string): Promise<void> {
    try {
      if (!userId) {
        throw new Error("User id is required");
      }

      const updatedUser = await this.userRepository.update(userId, {
        name,
        email,
      });

      if (!updatedUser) {
        throw new Error("User not found");
      }

      await this.enqueueUserUpdated({
        id: userId,
        email: updatedUser.email,
        role: updatedUser.role || "USER",
        createdAt: updatedUser.createdAt || new Date(),
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

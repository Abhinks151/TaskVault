import type { UserCreatedPayload } from "../../../infrastructure/interface/userCreatedQueuePayload.js";
import type { IUserRepository } from "../../interfaces/repositories/IUserRepository.js";
import type { IUpdateUserDetailsUsecase } from "../../interfaces/use-cases/IUpdateUserDetailsUsecase.js";

export class UpdateUserDetailsUsecase implements IUpdateUserDetailsUsecase {
  constructor(private userRepository: IUserRepository , 
    private enqueueUserUpdated: (payload: UserCreatedPayload) => Promise<void>,

  ) {}

  async execute(userId: string, name: string, email: string): Promise<void> {
    try {
      if (!userId) {
        throw new Error("User id is required");
      }

      await this.userRepository.updateUserDetails(userId, name, email);

      this.enqueueUserUpdated({
        id: userId,
        email,
        role: "USER",
        createdAt: new Date(),
      });

    } catch (error) {
      console.log(error);
    }
  }
}

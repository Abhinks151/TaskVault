import type { User } from "../../../domain/entities/User.js";
import type { IUserRepository } from "../../interfaces/repositories/IUserRepository.js";
import type { IAdminUsecase } from "../../interfaces/use-cases/IAdminUsecase.js";

export class AdminUsecase implements IAdminUsecase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<User[] | null> {
    return await this.userRepository.findAll();
  }
}

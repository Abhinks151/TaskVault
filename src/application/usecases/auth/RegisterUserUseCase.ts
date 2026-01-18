import type { IUserRepository } from "../../repositories/IUserRepository.js";
import type { IPasswordService } from "../../services/IPasswordService.js";
import type { IRegisterUserUsecase } from "./IRegisterUserUsecase.js";
import type { User } from "../../../domain/entities/User.js";

export class RegisterUserUseCase implements IRegisterUserUsecase {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordService
  ) {}

  async execute(name: string, email: string, password: string): Promise<void> {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await this.passwordHasher.hash(password);

    const user: User = {
      name,
      email,
      password: hashedPassword,
      role: "USER",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.userRepository.create(user);
  }
}

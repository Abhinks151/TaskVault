import type { IPasswordService } from "../../interfaces/services/IPasswordService.js";
import type { IRegisterUserUsecase } from "../../interfaces/use-cases/IRegisterUserUsecase.js";
import type { User } from "../../../domain/entities/User.js";
import type { IUserRepository } from "../../interfaces/repositories/IUserRepository.js";
import type { IMessageService } from "../../interfaces/services/IMessageSerice.js";

export class RegisterUserUseCase implements IRegisterUserUsecase {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordService,
    private messageService: IMessageService,
  ) {
    console.log("queue working");
  }

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
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newUser = await this.userRepository.create(user);

    //create new job(queue)
    // await this.enqueueUserCreated({
    //   id: newUser._id!,
    //   email: user.email,
    //   role: user.role,
    //   createdAt: user.createdAt,
    // });

    await this.messageService.publish("USER_CREATED", {
      id: newUser._id!,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    });
  }
}

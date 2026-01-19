import type { IUserRepository } from "../../application/interfaces/repositories/IUserRepository.js";
import type { User } from "../../domain/entities/User.js";
import { Users } from "../database/userModel.js";

export class UserRepository implements IUserRepository {
  constructor() {}

  async findByEmail(email: string): Promise<User | null> {
    return await Users.findOne({ email });
  }

  async create(user: User): Promise<User> {
    return await Users.create({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async updateUserDetails(
    userId: string,
    name: string,
    email: string,
  ): Promise<void | null> {
    return await Users.findOneAndUpdate({ _id: userId }, { name, email });
  }
}

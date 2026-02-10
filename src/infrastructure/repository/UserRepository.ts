import type { IUserRepository } from "../../application/interfaces/repositories/IUserRepository.js";
import type { User } from "../../domain/entities/User.js";
import { Users } from "../database/userModel.js";

export class UserRepository implements IUserRepository {
  constructor() {}

  async findByEmail(email: string): Promise<User | null> {
    return await Users.findOne({ email });
  }

  async create(user: User): Promise<User> {
    return await Users.create(user);
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    return await Users.findOneAndUpdate(
      { _id: id },
      { $set: data },
      { new: true },
    );
  }

  async findById(id: string): Promise<User | null> {
    return await Users.findOne({ _id: id });
  }

  async findAll(): Promise<User[] | null> {
    return await Users.find({}).lean();
  }
}

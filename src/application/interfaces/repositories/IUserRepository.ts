import type { User } from "../../../domain/entities/User.js";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;

  updateUserDetails(
    userId: string,
    name: string,
    email: string,
  ): Promise<void | null>;

  getAllUser(): Promise<User[] | null>;
}

import type { User } from "../../../domain/entities/User.js";
import type { IBaseRepository } from "./IBaseRepository.js";

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}
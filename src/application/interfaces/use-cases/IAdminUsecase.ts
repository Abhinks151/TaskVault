import type { User } from "../../../domain/entities/User.js";

export interface IAdminUsecase {
  execute(): Promise<User[] | null>;
}
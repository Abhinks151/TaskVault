import type { UserCreatedPayload } from "../interface/userCreatedQueuePayload.js";
import { prisma } from "./prisma.js";

export class PostgresUserRepository {
  async createUserIfNotExists(data: UserCreatedPayload) {
    const existingUser = await prisma.user.findUnique({
      where: { id: data.id },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: {
          id: data.id,
          email: data.email,
          role: data.role,
          createdAt: new Date(data.createdAt),
        },
      });
    }
  }


  async updateUser(data: UserCreatedPayload) {
    await prisma.user.update({
      where: { id: data.id },
      data: {
        email: data.email,
        role: data.role,
        createdAt: new Date(data.createdAt),
      },
    });
  }
}

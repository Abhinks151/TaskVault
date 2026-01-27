import { Worker } from "bullmq";
import { redisConnection } from "./redisConnection.js";
import { PostgresUserRepository } from "../postgres/PostgresUserRepository.js";

const postgresUserRepository = new PostgresUserRepository();

export const worker = new Worker(
  "user-queue",
  async (job) => {
    if (job.name === "USER_CREATED") {
      await postgresUserRepository.createUserIfNotExists(job.data);
    } else if (job.name === "USER_UPDATED") {
      await postgresUserRepository.updateUser(job.data);
    }
  },
  {
    connection: redisConnection,
  },
);

worker.on("completed", (job) => {
  console.log(`${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.log(`${job?.id} failed`, err);
});

import { Worker } from "bullmq";
import { redisConnection } from "./redisConnection.js";

export const worker = new Worker(
  "user-queue",
  async (job) => {
    console.log(job.id);
    console.log(job.data);
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

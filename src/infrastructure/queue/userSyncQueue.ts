// import { Queue } from "bullmq";
// import { redisConnection } from "./redisConnection.js";

// export type UserSyncEvent = "USER_CREATED";

// export const userSyncQueue = new Queue("user-queue", {
//   connection: redisConnection as any ,
// });

import { Queue } from "bullmq";

import dotenv from "dotenv";

import type { UserCreatedPayload } from "../interface/userCreatedQueuePayload.js";

import { redisConnection } from "./redisConnection.js";

export type UserSyncEvent = "USER_CREATED" | "USER_UPDATED";

dotenv.config();

export const userSyncQueue = new Queue("user-queue", {
  connection: redisConnection,
});

export async function enqueueUserCreated(
  payload: UserCreatedPayload,
): Promise<void> {
  await userSyncQueue.add("USER_CREATED", payload, {
    attempts: Number(process.env.QUEUE_MAX_ATTEMPTS) || 3,
    backoff: {
      type: "exponential",
      delay: Number(process.env.QUEUE_DELAY) || 2000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  });
}

export async function enqueUserUpdated(
  payload: UserCreatedPayload,
): Promise<void> {
  await userSyncQueue.add("USER_UPDATED", payload, {
    attempts: Number(process.env.QUEUE_MAX_ATTEMPTS) || 3,
    backoff: {
      type: "exponential",
      delay: Number(process.env.QUEUE_DELAY) || 2000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  });
}


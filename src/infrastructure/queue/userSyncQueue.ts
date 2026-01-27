// import { Queue } from "bullmq";
// import { redisConnection } from "./redisConnection.js";

// export type UserSyncEvent = "USER_CREATED";

// export const userSyncQueue = new Queue("user-queue", {
//   connection: redisConnection as any ,
// });

import { Queue } from "bullmq";
import { redisConnection } from "./redisConnection.js";
import type { UserCreatedPayload } from "../interface/userCreatedQueuePayload.js";

export type UserSyncEvent = "USER_CREATED" | "USER_UPDATED";

export const userSyncQueue = new Queue("user-queue", {
  connection: redisConnection,
});

export async function enqueueUserCreated(
  payload: UserCreatedPayload,
): Promise<void> {
  await userSyncQueue.add("USER_CREATED", payload, {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  });
}

export async function enqueUserUpdated(
  payload: UserCreatedPayload,
): Promise<void> {
  await userSyncQueue.add("USER_UPDATED", payload, {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  });
}

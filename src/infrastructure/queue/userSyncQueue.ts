import { Queue } from "bullmq";
import { redisConnection } from "./redisConnection.js";


export type UserSyncEvent = "USER_CREATED";

export const userSyncQueue = new Queue("user-sync", {
  connection: redisConnection as any ,
});

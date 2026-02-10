import { Queue } from "bullmq";
import { redisConnection } from "../queue/redisConnection.js";
import type { IMessageService } from "../../application/interfaces/services/IMessageSerice.js";
import dotenv from "dotenv";

dotenv.config();

export class BullMQMessageService implements IMessageService {
  private queue: Queue;

  constructor() {
    this.queue = new Queue("user-queue", {
      connection: redisConnection,
    });
  }

  async publish(topic: string, data: any): Promise<void> {
    await this.queue.add(topic, data, {
      attempts: Number(process.env.QUEUE_MAX_ATTEMPTS) || 3,
      backoff: {
        type: "exponential",
        delay: Number(process.env.QUEUE_DELAY) || 2000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    });
  }
}

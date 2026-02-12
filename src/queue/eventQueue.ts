import { Queue } from "bullmq";
import { redis } from "../lib/redis";

export const eventQueues = new Queue("queue-events", {
  connection: redis,
});
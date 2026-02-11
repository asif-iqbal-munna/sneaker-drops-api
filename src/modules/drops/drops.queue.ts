import { Queue } from "bullmq";
import { redis } from "../../lib/redis";

export const dropsQueue = new Queue("drops-publisher", {
  connection: redis,
});

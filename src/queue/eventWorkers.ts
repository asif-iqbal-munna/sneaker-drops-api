import { Worker } from "bullmq";
import { dropWorker } from "./workers/dropWorker";
import { redis } from "../lib/redis";
import { reservationWorker } from "./workers/reservationWorker";

export const eventWorker = new Worker(
  "queue-events",

  async (job) => {
    console.log({ job })

    if(job.name === "publish-drops") {
      await dropWorker(job)
    }

    if(job.name === "reservation-expiry") {
      await reservationWorker(job)
    }

    console.log(`queue run`);
  },

  { connection: redis }
);
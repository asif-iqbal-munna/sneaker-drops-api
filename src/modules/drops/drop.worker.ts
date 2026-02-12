import { Worker } from "bullmq";
import { Drop } from "./drops.model";
import { redis } from "../../lib/redis";
import { emitDropEvent } from "../../lib/socket";

export const dropWorker = new Worker(
  "drops-publisher",

  async (job) => {
    console.log({ job })
    const { dropId } = job.data;

    const drop = await Drop.findByPk(dropId);

    if (!drop) return;

    if (drop.status !== "scheduled") return;

    await drop.update({
      status: "live",
    });

    emitDropEvent({ type: "drop", payload: drop })

    console.log(`success`);
  },

  { connection: redis }
);

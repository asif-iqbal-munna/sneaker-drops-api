import { emitDropEvent } from "../../lib/socket";
import { Drop } from "../../modules/drops/drops.model";
import { eventQueues } from "../eventQueue";

export const dropWorker = async (job: any) => {
  const { dropId } = job.data;

  const drop = await Drop.findByPk(dropId);

  if (!drop) {
    await eventQueues.remove(job.id)
    return
  };

  if (drop.status !== "scheduled") {
    await eventQueues.remove(job.id)
    return
  };

  await drop.update({
    status: "live",
  });

  emitDropEvent({ type: "drop", payload: drop })
  console.log("drop success")
}

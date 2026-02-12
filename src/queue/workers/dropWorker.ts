import { emitDropEvent } from "../../lib/socket";
import { Drop } from "../../modules/drops/drops.model";

export const dropWorker = async (job: any) => {
  const { dropId } = job.data;

  const drop = await Drop.findByPk(dropId);

  if (!drop) return;

  if (drop.status !== "scheduled") return;

  await drop.update({
    status: "live",
  });

  emitDropEvent({ type: "drop", payload: drop })
  console.log("drop success")
}

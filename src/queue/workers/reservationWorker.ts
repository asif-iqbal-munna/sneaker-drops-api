import { emitDropEvent } from "../../lib/socket";
import { Drop } from "../../modules/drops/drops.model";
import { Reservation } from "../../modules/reservation/reservation.model";
import { eventQueues } from "../eventQueue";

export const reservationWorker = async (job: any) => {
  const { dropId, reservationId } = job.data;

  const reservation = await Reservation.findByPk(reservationId);
  if (!reservation) {
    await eventQueues.remove(job.id)
    return
  };

  if (["expired", "completed"].includes(reservation.status)) {
    await eventQueues.remove(job.id)
    return
  };

  const drop = await Drop.findByPk(dropId);

  if (drop) {
    await drop.increment('available_stock');
    await drop.reload();
    console.log(drop?.available_stock, "after increment")
    await reservation.update({ status: "expired" })
    emitDropEvent({ type: "stock", payload: { dropId: reservation.drop_id, userId: reservation.user_id, available: drop?.available_stock } })
  }
}
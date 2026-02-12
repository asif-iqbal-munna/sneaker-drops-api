import { sequelize } from "../../core/db"
import { emitDropEvent } from "../../lib/socket";
import { Drop } from "../drops/drops.model";
import { Reservation } from "./reservation.model"
import { scheduleReservation } from "./reservation.schedule";


export const createReservation = async (user_id: number, drop_id: number) => {
  const transaction = await sequelize.transaction()
  try {
    const drop = await Drop.findOne({
      where: { id: drop_id },
      lock: transaction.LOCK.UPDATE,
      transaction: transaction
    });
    
    if (!drop || drop.available_stock <= 0) {
      throw new Error("OUT_OF_STOCK");
    }
    
    await drop.decrement(
      "available_stock",
      { by: 1, transaction }
    );
  
    const reservation = await Reservation.create(
      {
        drop_id,
        user_id,
      }, 
      { transaction }
    );

    await scheduleReservation(drop_id, reservation.id)

    emitDropEvent({type: "stock", payload: {dropId: drop_id, available: drop.available_stock}})

    await transaction.commit();
  } catch (error) {
    await transaction.rollback()
    console.error("reservation failed", error);
    throw new Error("reservation failed");
  }
}

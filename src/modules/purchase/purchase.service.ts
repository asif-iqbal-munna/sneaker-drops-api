import { sequelize } from "../../core/db";
import { Drop } from "../drops/drops.model";
import { Reservation } from "../reservation/reservation.model";
import { Purchase } from "./purchase.model";

export const createPurchase = async (user_id: number, drop_id: number) => {
  const transaction = await sequelize.transaction()
  try {
    const reservation = await Reservation.findOne({
      where: { user_id, drop_id, status: "active"},
      transaction
    })

    const drop = await Drop.findByPk(drop_id, { transaction })

    if(!drop) {
      throw new Error("Drop that you are trying to purchase is not available")
    }

    if(!reservation) {
      throw new Error("You have no reservation to purchase the item or reservation is expired")
    }
    
    const purchase = await Purchase.create(
      {
        drop_id,
        user_id,
      },
      { transaction }
    );

    await reservation.update({ status: "completed"}, { transaction })

    await transaction.commit();
    
    return purchase
  } catch (error) {
    await transaction.rollback();
    console.error("reservation failed", error);
    throw new Error("reservation failed");
  }
}
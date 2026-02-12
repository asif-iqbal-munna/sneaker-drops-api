import { Drop } from "./drops.model";
import { DropCreationDto } from "./drops.interface";
import { scheduleDrop } from "./drop.schedules";
import { sequelize } from "../../core/db";
import { emitDropEvent } from "../../lib/socket";
import { Purchase } from "../purchase/purchase.model";
import { User } from "../user/user.model";

export const findDrops = async () => {
  try {
  const drops = await Drop.findAll({
    where: { status: "live" },
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: Purchase,
        as: "Purchases",
        include: [
          {
            model: User,
            as: "User"
          }
        ] 
      }
    ]
  });

  if (!drops) {
    throw new Error('No drops found');
  }

  return drops;
  } catch (error) {
    console.error("Failed to find drops", error);
    throw new Error('Failed to find drops');
  }
};

export const createDrop = async (input: DropCreationDto) => {
  const { name, price, total_stock, drops_date = null } = input;

  const payload: DropCreationDto = {
    name,
    price,
    total_stock,
    available_stock: total_stock,
  }

  if(drops_date) {
    payload.status = "scheduled"
    payload.drops_date = drops_date
  } else {
    payload.status = "live"
  }
  const transaction = await sequelize.transaction()
  try {
    const newDrop = await Drop.create(payload, { transaction });

    if(payload.status === "scheduled" && drops_date){
      await scheduleDrop(drops_date, newDrop.id)
    }

    if(payload.status === "live") {
      emitDropEvent({type: "drop", payload: newDrop})
    }

    await transaction.commit();
    return newDrop;
  } catch (error) {
    console.log(error)
    await transaction.rollback();
    throw new Error('Failed to create drop');
  }
};
  
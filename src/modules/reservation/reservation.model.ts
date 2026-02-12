import { Model } from "sequelize";
import { IReservation, ReservationCreationDto } from "./reservation.interface";

export class Reservation
  extends Model<IReservation, ReservationCreationDto>
  implements IReservation
{
  public id!: number;
  public uuid!: string;
  public drop_id!: number;
  public user_id!: number;
  public status!: "active" | "expired" | "completed";

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

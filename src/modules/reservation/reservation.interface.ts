import { Optional } from "sequelize";

export interface IReservation {
  id?: number;
  uuid?: string;
  drop_id: number;
  user_id: number;
  status?: "active" | "expired" | "completed";

  createdAt?: Date;
  updatedAt?: Date;
}

export interface ReservationCreationDto
  extends Optional<IReservation, "id" | "uuid" | "status"> {}
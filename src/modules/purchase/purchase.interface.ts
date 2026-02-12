import { Optional } from "sequelize";

export interface IPurchase {
  id?: number;
  uuid?: string;
  drop_id: number;
  user_id: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface PurchaseCreationDto
  extends Optional<IPurchase, "id" | "uuid"> {}
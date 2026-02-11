import { Optional } from "sequelize";

export interface IDrops {
  id?: number;
  uuid?: string;
  name: string;
  price: number;
  total_stock: number;
  available_stock: number;
  drops_date?: Date | null;
  status: "draft" | "scheduled" | "live" | "cancelled";

  createdAt?: Date;
  updatedAt?: Date;
}

export interface DropCreationDto
  extends Optional<IDrops, "id" | "uuid" | "status" | "available_stock"> {}
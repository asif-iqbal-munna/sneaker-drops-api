import { Optional } from "sequelize";

export interface IUser {
  id?: number;
  uuid?: string;
  username: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateUserDTO
  extends Optional<IUser, "id" | "uuid"> {}
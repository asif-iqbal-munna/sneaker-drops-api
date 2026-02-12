import { Model } from "sequelize";
import { CreateUserDTO, IUser } from "./user.interface";
export class User
  extends Model<IUser, CreateUserDTO>
  implements IUser
{
  public id!: number;
  public uuid!: string;
  public username!: string;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}


import { Model } from "sequelize";
import { IDrops, DropCreationDto } from "./drops.interface";

export class Drop
  extends Model<IDrops, DropCreationDto>
  implements IDrops
{
  public id!: number;
  public uuid!: string;
  public name!: string;
  public price!: number;
  public total_stock!: number;
  public available_stock!: number;
  public drops_date!: Date;
  public status!: "draft" | "scheduled" | "live" | "cancelled";

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}



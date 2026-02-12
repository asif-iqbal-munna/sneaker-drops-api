import { ForeignKey, Model } from "sequelize";
import { IPurchase, PurchaseCreationDto } from "./purchase.interface";

export class Purchase
  extends Model<IPurchase, PurchaseCreationDto>
  implements IPurchase
{
  public id!: number;
  public uuid!: string;
  public drop_id!: ForeignKey<number>;
  public user_id!: ForeignKey<number>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    Purchase.belongsTo(models.Drop, {
      foreignKey: "drop_id",
      as: "drop",
    });

    Purchase.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "User",
    });
  }
}

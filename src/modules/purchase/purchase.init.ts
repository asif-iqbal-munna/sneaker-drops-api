import { DataTypes, Sequelize } from "sequelize";
import { Purchase } from "./purchase.model";
import { Drop } from "../drops/drops.model";

export const initPurchase = (sequelize: Sequelize) => {
  Purchase.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
      },
      drop_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'drops', 
          key: 'id',
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users', 
          key: 'id',
        }
      },
    },
    {
      sequelize,
      tableName: "purchases",
      timestamps: true,
    }
  );

  return Purchase;
};

import { Purchase } from "../purchase/purchase.model";
import { Drop } from "./drops.model";
import { DataTypes, Model, Sequelize } from "sequelize";

export const initDrop = (sequelize: Sequelize) => {
  Drop.init(
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

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      total_stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      available_stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      drops_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      status: {
        type: DataTypes.ENUM(
          "draft",
          "scheduled",
          "live",
          "cancelled"
        ),
        allowNull: false,
        defaultValue: "draft",
      },
    },
    {
      sequelize,
      tableName: "drops",
      timestamps: true,
    }
  );

  return Drop;
};
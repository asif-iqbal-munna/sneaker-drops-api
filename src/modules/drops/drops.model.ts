import { Model, DataTypes, Optional, Sequelize } from "sequelize";

export interface DropAttributes {
  id: number;
  uuid: number;
  name: string;
  price: number;
  total_stock: number;
  available_stock: number;
  start_date: Date;
  status: "active" | "in-active" | "out-of-stock" | "live";

  createdAt?: Date;
  updatedAt?: Date;
}

interface DropCreationAttributes
  extends Optional<DropAttributes, "id" | "status"> {}

export class Drop
  extends Model<DropAttributes, DropCreationAttributes>
  implements DropAttributes
{
  public id!: number;
  public uuid!: number;
  public name!: string;
  public price!: number;
  public total_stock!: number;
  public available_stock!: number;
  public start_date!: Date;
  public status!: "active" | "in-active" | "out-of-stock" | "live";

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

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
        primaryKey: true,
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

      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM(
          "active",
          "in-active",
          "out-of-stock",
          "live"
        ),
        allowNull: false,
        defaultValue: "active",
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

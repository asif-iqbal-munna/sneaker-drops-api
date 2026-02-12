import { DataTypes, Sequelize } from "sequelize";
import { Reservation } from "./reservation.model";

export const initReservation = (sequelize: Sequelize) => {
  Reservation.init(
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
      status: {
        type: DataTypes.ENUM("active", "expired", "completed")
      }
    },
    {
      sequelize,
      tableName: "reservations",
      timestamps: true,
    }
  );

  return Reservation;
};

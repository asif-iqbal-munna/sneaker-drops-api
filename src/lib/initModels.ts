import type { Sequelize } from 'sequelize';
import { initDrop } from '../modules/drops/drop.init';
import { initUser } from '../modules/user/user.init';
import { initReservation } from '../modules/reservation/reservation.init';
import { initPurchase } from '../modules/purchase/purchase.init';

export const initModels = (sequelize: Sequelize) => {
  const Drop = initDrop(sequelize);
  const Purchase = initPurchase(sequelize);
  const Reservation = initReservation(sequelize);
  const User = initUser(sequelize);

  const models = {
    Drop,
    Purchase,
    Reservation,
    User,
  };

  Object.values(models).forEach((model: any) => {
    if (model.associate) {
      model.associate(models);
    }
  });

  return models;
};


import type { Sequelize } from 'sequelize';
import { initDrop } from '../modules/drops/drop.init';
import { initUser } from '../modules/user/user.init';

export const initModels = (sequelize: Sequelize) => {
  initUser(sequelize);
  initDrop(sequelize);
};


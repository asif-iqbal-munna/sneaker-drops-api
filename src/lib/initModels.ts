import type { Sequelize } from 'sequelize';
import { initUser } from '../modules/user/user.model';
import { initDrop } from '../modules/drops/drop.init';

export const initModels = (sequelize: Sequelize) => {
  initUser(sequelize);
  initDrop(sequelize);
};


import { Sequelize } from 'sequelize';
import { config } from '../config';
import { DataTypeAbstract, ModelAttributeColumnOptions } from 'sequelize';
import { User } from './User';
import { Address } from './Address';

declare global {
  type SequelizeAttributes<T extends { [key: string]: any }> = {
    [P in keyof T]: string | DataTypeAbstract | ModelAttributeColumnOptions;
  };
}

const sequelize = new Sequelize({
  ...config.mysql,
  dialect: 'mysql',
  define: {
    charset: 'utf8mb4',
  },
  logging: false,
  pool: {
    acquire: 30000,
  },
});

const db = {
  sequelize,
  Address: Address.initModel(sequelize),
  User: User.initModel(sequelize),
};

Object.keys(db)
  .map(key => db[key])
  .forEach((model: any) => {
    if (model.associate) {
      model.associate(db);
    }
  });

const sync = async () => {
  await sequelize.sync({ force: false });
};

export { sync, db, sequelize };

import { Sequelize } from 'sequelize';
import serverConfig from '../../config/serverConfig';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: serverConfig.POSTGRE_DATABASE,
  username: serverConfig.POSTGRE_USERNAME,
  password: serverConfig.POSTGRE_PASSWORD
});

export default sequelize;

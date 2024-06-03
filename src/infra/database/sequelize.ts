import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost', 
  port: 5432,
  database: 'Escolha_pedro',
  username: 'Escolha_pedro',
  password: 'Escolha_pedro',
});

export default sequelize;

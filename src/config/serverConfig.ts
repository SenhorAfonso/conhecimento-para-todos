import dotenv from 'dotenv';

dotenv.config();

const serverConfig = {
  SERVER_PORT: process.env.SERVER_PORT,
  DATABASE_URI: process.env.DATABASE_URI,
  JWT_SECRETE_KEY: process.env.JWT_SECRETE_KEY,
  POSTGRE_DATABASE: process.env.POSTGRE_DATABASE,
  POSTGRE_USERNAME: process.env.POSTGRE_USERNAME,
  POSTGRE_PASSWORD: process.env.POSTGRE_PASSWORD
};

export default serverConfig;
import dotenv from 'dotenv';

dotenv.config();

const serverConfig = {
  SERVER_PORT: process.env.SERVER_PORT,
  DATABASE_URI: process.env.DATABASE_URI,
  JWT_SECRETE_KEY: process.env.JWT_SECRETE_KEY
};

export default serverConfig;
import dotenv from 'dotenv';

dotenv.config();

const serverConfig = {
  SERVER_PORT: process.env.SERVER_PORT,
  DATABASE_URI: process.env.DATABASE_URI
};

export default serverConfig;
import { config } from 'dotenv';
import path from 'path';

// Change envStatus from `0 to 1` for Production
const envStatus = process.env.NODE_ENV;
if (envStatus === 'development')
  config({ path: path.resolve(__dirname + '/.env.development') });
if (envStatus === 'production')
  config({ path: path.resolve(__dirname + '/.env.production') });

const configEnv = {
  PORT: process.env.PORT,
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
  MYSQL_DATABASE: process.env.MYSQL_DATABASE,
};

export default configEnv;

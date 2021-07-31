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
  FRONTEND_ORIGIN_HOST_URL: process.env.FRONTEND_ORIGIN_HOST_URL,
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  CRYPTR_SECRET_KEY: process.env.CRYPTR_SECRET_KEY,
};

export default configEnv;

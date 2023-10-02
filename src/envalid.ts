import { str, cleanEnv, num } from 'envalid';
import { config } from 'dotenv';

config();
export const env = cleanEnv(process.env, {
  EXPIRES_IN: str(),
  SECRET_KEY: str(),
  DB_USERNAME: str(),
  DB_PASSWORD: str(),
  DB_DATABASE: str(),
  DB_HOST: str(),
  DB_PORT: num(),
});

import dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const target_environment: string = process.env.TARGET_ENVIRONMENT as string;

const port: number = Number(process.env.PORT || process.env.DEFAULT_PORT);

const db_url: string = process.env.DATABASE_URL as string;

const bcrypt_salt_rounds: number = Number(process.env.BCRYPT_SALT_ROUNDS);

const jwt = {
  access_secret: process.env.JWT_ACCESS_SECRET as Secret,
  access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN as string,
  refresh_secret: process.env.JWT_REFRESH_SECRET as Secret,
  refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN as string,
};

export const configData = {
  target_environment,
  port,
  db_url,
  bcrypt_salt_rounds,
  jwt,
};

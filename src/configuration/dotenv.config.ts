import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const target_environment: string = process.env.TARGET_ENVIRONMENT as string;

const port: number = Number(process.env.PORT || process.env.DEFAULT_PORT);

const db_url: string = process.env.DATABASE_URL as string;

const bcrypt_salt_rounds: number = Number(process.env.BCRYPT_SALT_ROUNDS);

export const configData = {
  target_environment,
  port,
  db_url,
  bcrypt_salt_rounds,
};

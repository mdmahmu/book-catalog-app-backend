import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const target_environment = process.env.TARGET_ENVIRONMENT;

const port: number = Number(process.env.PORT || process.env.DEFAULT_PORT);

const db_url: string = process.env.DATABASE_URL as string;

export const configData = {
  target_environment,
  port,
  db_url,
};

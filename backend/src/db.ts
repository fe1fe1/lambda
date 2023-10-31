import { createPool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

//database connection

const DB_URL: string = process.env.DB_URL as string;

export const pool = createPool({ uri: DB_URL });

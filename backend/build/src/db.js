import { createPool } from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
//database connection
const DB_URL = process.env.DB_URL;
export const pool = createPool({ uri: DB_URL });

import { createPool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

//database connection
export const pool = createPool(process.env.DB_URL);

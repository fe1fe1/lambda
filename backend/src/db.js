import { createPool } from "mysql2/promise";

//database connection
export const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "lambda",
    port: 3306,
});

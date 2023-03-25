import { createPool } from "mysql2/promise";

//database connection
export const pool = createPool({
    host: "localhost",
    user: "feifei",
    password: "Fedora37_mysqlfei",
    database: "test_local",
    port: 3306,
});

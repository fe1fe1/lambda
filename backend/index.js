import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsRouter from "./routes/products.js";
import { pool } from "./db.js";
import mysql from "mysql";

dotenv.config();

const app = express();

// middleweares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/*
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "morley",
    database: "pruebas",
});
*/

// routes
app.get("/api/products", async (req, res) => {
    const [result] = await pool.query(`SELECT * FROM products`);
    console.log(result);
    res.json(result);
    /*    
    
    connection.connect();
    const [rows] = connection.query("SELECT * FROM productos_pruebas");
    console.log(rows);
    res.json(rows);
    connection.end();
    */
});

// server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsRouter from "./routes/products-routes.js";
import usersRouter from "./routes/users-routes.js";
import { pool } from "./db.js";

dotenv.config();

const app = express();

// middleweares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/api", productsRouter);
app.use("/api", usersRouter);

// server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});

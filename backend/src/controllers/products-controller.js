import { pool } from "../db.js";
const productsTable = "productsTesting";

export const getProducts = async (req, res) => {
    console.log("get products requested!");
    try {
        const [result] = await pool.query(`SELECT * FROM ${productsTable}`);
        console.log(result);
        console.log("success");
        res.send(result);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
        console.log("error");
    }
};

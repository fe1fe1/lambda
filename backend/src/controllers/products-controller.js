import { pool } from "../db.js";
const productsTable = "products";

export const getProducts = async (req, res) => {
    console.log("getting products...");
    try {
        const [result] = await pool.query(`SELECT * FROM ${productsTable}`);
        console.log(result);
        console.log("success");
        res.send(result);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
        console.log(error);
    }
};
    
export const getProduct = async (req, res) => {
    const productId = req.params.id
    console.log(`getting product id: ${productId}`);
    try {
        const [result] = await pool.query(`SELECT * FROM ${productsTable} WHERE id = ?`, [productId]);

        if (result.length <= 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        console.log(result);
        console.log("success");
        res.send(result);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong", error: error});
        console.log(error);
    }
};

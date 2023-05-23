import { pool } from "../db.js";
const paymentTable = "payment";

export const getUserPayment = async (req, res) => {
    console.log("getting payment...");
    try {
        const [result] = await pool.query(
            `SELECT * FROM ${table} WHERE userId = ?`,
            [req.params.userId]
        );

        if (result.length <= 0) {
            return res.status(404).json({ message: `Resource not found in: ${paymentTable}` });
        }

        console.log(result);
        console.log("success");
        res.send(result);

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error });
        next(error);
    }
};

export const postUserPayment = async (req, res) => {
    console.log("posting payment...")
    const { userId, method } = req.body;
    if (!userId)
        return res.status(409).json({ message: "userId field is required" })
    if (!method)
        return res.status(409).json({ message: "method field is required" })
    try {
        const [result] = await pool.query(
            `INSERT INTO ${usersTable} (userId, method) VALUES (?, ?)`,
            [userId, method]
        );
        console.log("success");
        console.log(result);
        res.json({ id: result.insertId, userId, method });
    } catch (error) {
        res.status(404).json({ message: "Something went wrong", error: error });
        console.log(error);
    }
};

export const updateUserPayment = async (req, res) => {
    console.log("updating payment...");
};

export const deleteUserPayment = async (req, res) => {
    console.log("deleting payment...");
    try {
        const [result] = await pool.query(
            `DELETE * FROM ${paymentTable} WHERE userId = ?`,
            [req.params.userId]
        );

        if (result.length <= 0) {
            return res.status(404).json({ message: `Resource not found in: ${paymentTable}` });
        }

        console.log(result);
        console.log("success");
        res.send(result);

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error });
        next(error);
    }
};

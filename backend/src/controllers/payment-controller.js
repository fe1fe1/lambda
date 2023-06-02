import { pool } from "../db.js";

export const getUserPayment = async (req, res) => {
    console.log("getting payment...");
    try {
        const [result] = await pool.query(
            `SELECT * FROM payment WHERE user_id=?`,
            [req.params.userId]
        );

        if (result.length <= 0) {
            return res.status(404).json({ message: `Payment info not found` });
        }

        console.log(result);
        console.log("success");
        res.send(result);

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error });
        console.log(error);
    }
};

export const postUserPayment = async (req, res) => {
    console.log("posting payment...", req.body)
    const userId = req.params.userId;
    const method = req.body.method;
    if (!method)
        return res.status(409).json({ message: "method field is required" })
    try {
        const [result] = await pool.query(
            `INSERT INTO payment (user_id, method) VALUES (?) ON DUPLICATE KEY UPDATE method=?`,
            [[userId, method], method],
        );
        console.log(result);
        console.log("success");
        res.send({ userId: userId, method: method });
    } catch (error) {
        res.status(404).json({ message: "Something went wrong", error: error });
        console.log(error);
    }
};

export const updateUserPayment = async (req, res) => {
    console.log("updating payment...");
    const userId = req.params.userId;
    const method = req.body.method;
    if (!method)
        return res.status(409).json({ message: "method field is required" })

    try {
        const [result] = await pool.query(
            `UPDATE payment SET method=? WHERE user_id=?`,
            [method, userId],
        );
        console.log(result);
        console.log("success");
        res.send({ userId: userId, method: method });
    } catch (error) {
        res.status(404).json({ message: "Something went wrong", error: error });
        console.log(error);
    }
};

export const deleteUserPayment = async (req, res) => {
    console.log("deleting payment...");
    try {
        const [result] = await pool.query(
            `DELETE * FROM payment WHERE user_id=?`,
            [req.params.userId]
        );
        if (result.length <= 0) {
            return res.status(404).json({ message: `Payemnt info not found` });
        }
        console.log(result);
        console.log("success");
        res.send(result);

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error });
        next(error);
    }
};

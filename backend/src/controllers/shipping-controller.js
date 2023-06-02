import { pool } from "../db.js";

export const getUserShipping = async (req, res) => {
    console.log("getting shipping...");
    try {
        const [result] = await pool.query(
            `SELECT * FROM shipping WHERE user_id=?`,
            [req.params.userId]
        );

        if (result.length <= 0) {
            return res.status(404).json({ message: `Shipping info not found` });
        }

        console.log(result);
        console.log("success");
        res.send(result[0]);

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error });
        console.log(error);
    }
};

export const postUserShipping = async (req, res) => {
    console.log("posting shipping...", req.body)
    const userId = req.params.userId;
    const { address, city, postal_code, country } = req.body;
    if (!address || !city || !postal_code || !country)
        return res.status(409).json({ message: "Missing fields" })
    const values = [address, city, postal_code, country]
    try {
        const [result] = await pool.query(
            `INSERT INTO shipping (user_id, address, city, postal_code, country) VALUES (?) 
             ON DUPLICATE KEY UPDATE address=?, city=?, postal_code=?, country=?`,
            [[userId, ...values], ...values],
        );
        console.log(result);
        console.log("success");
        res.json(req.body);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong", error: error });
        console.log(error);
    }
};

export const updateUserShipping = async (req, res) => {
    console.log("updating shipping...");
    const userId = req.params.userId;
    const { address, city, postal_code, country } = req.body;
    if (!address || !city || !postal_code || !country)
        return res.status(409).json({ message: "Missing fields" })
    try {
        const [result] = await pool.query(
            `UPDATE shipping 
             SET address=?, city=?, postal_code=?, country=?
             WHERE user_id=?`,
            [address, city, postal_code, country, userId],
        );
        console.log(result);
        console.log("success");
        res.send({ userId, address, city, postal_code, country });
    } catch (error) {
        res.status(404).json({ message: "Something went wrong", error: error });
        console.log(error);
    }
};

export const deleteUserShipping = async (req, res) => {
    console.log("deleting shipping...");
    try {
        const [result] = await pool.query(
            `DELETE * FROM shipping WHERE user_id=?`,
            [req.params.userId]
        );
        if (result.length <= 0) {
            return res.status(404).json({ message: `Shipping info not found` });
        }
        console.log(result);
        console.log("success");
        res.send(result);

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error });
        next(error);
    }
};

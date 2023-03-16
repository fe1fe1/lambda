import { pool } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
    console.log("getting users...");
    try {
        const [result] = await pool.query(`SELECT * FROM userstesting`);
        console.log(result);
        console.log("success");
        res.send(result);
    } catch (error) {
        res.status(404).json({
            message: "Something went wrong",
            error: error,
        });
        console.log(error);
    }
};

export const getUser = async (req, res) => {
    console.log("getting user...");
    try {
        const [result] = await pool.query(
            `SELECT * FROM userstesting WHERE id = ?`,
            [req.params.id]
        );
        if (result.length <= 0) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log(result);
        console.log("success");
        res.send(result);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong", error: error });
        console.log(error);
    }
};

export const deleteUser = async (req, res) => {
    console.log("deleting user...");
    try {
        const [result] = await pool.query(
            `DELETE FROM userstesting WHERE id = ?`,
            [req.params.id]
        );
        if (result.affectedRows <= 0) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(result);
        console.log("success");
        res.sendStatus(204);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong", error: error });
        console.log(error);
    }
};

export const signupUser = async (req, res) => {
    console.log("posting user...");
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return res
            .status(409)
            .json({ message: "Username, email and password are required" });

    const [duplicate] = await pool.query(
        `SELECT * FROM userstesting WHERE user_name = ? or user_email = ?`,
        [name, email]
    );
    console.log(duplicate);

    if (duplicate.length > 0)
        return res
            .status(409)
            .json({ message: "Duplicate username and/or email" });

    try {
        const hashedPwd = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            `INSERT INTO userstesting (user_name, user_email, user_password) VALUES (?, ?, ?)`,
            [name, email, hashedPwd]
        );

        console.log("success");
        res.json({ id: result.insertId, name, email, password });
    } catch (error) {
        res.status(404).json({ message: "Something went wrong", error: error });
        console.log(error);
    }
};

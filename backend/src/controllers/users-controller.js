import { pool } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt, { compare } from "bcrypt";

const usersTable = "user";

export const registerUser = async (req, res) => {
    console.log("posting user...");
    const { username, email, password } = req.body;
    if (!username || !email || !password)
        return res
            .status(409)
            .json({ message: "Username, email and password fields are required" });

    const [duplicate] = await pool.query(
        `SELECT * FROM ${usersTable} WHERE name = ? or email = ?`,
        [username, email]
    );
    console.log(duplicate);

    if (duplicate.length > 0)
        return res
            .status(409)
            .json({ message: "Duplicate username and/or email" });

    try {
        const hashedPwd = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            `INSERT INTO ${usersTable} (name, email, password) VALUES (?, ?, ?)`,
            [username, email, hashedPwd]
        );

        console.log("success");
        console.log(result);
        res.json({ id: result.insertId, username, email, password });
    } catch (error) {
        res.status(404).json({ message: "Something went wrong", error: error });
        console.log(error);
    }
};

export const loginUser = async (req, res) => {
    try {
        const [userData] = await pool.query(
            `SELECT * FROM ${usersTable} WHERE email = ?`,
            [req.body.email]
        );
        console.log(req.body);
        console.log(userData);
        const user = userData[0];

        if (!user)
            return res.status(401).json({ message: "Invalid credentials" });

        const match = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (match) {
            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.name,
                    email: user.email,
                    isAdmin: user.is_admin,
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "48h",
                }
            );

            res.send({
                id: user.id,
                username: user.name,
                email: user.email,
                isAdmin: user.is_admin,
                token: token,
            });
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        res.status(404).json({ message: "Something went wrong", error: error });
    }
};

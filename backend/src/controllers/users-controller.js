import { pool } from "../db.js";
import { createUserToken, hash, match } from "../utils.js";

const usersTable = "user";

export const registerUser = async (req, res) => {
    console.log("posting user...");
    const { username, email, password } = req.body;
    if (!username || !email || !password)
        return res
            .status(409)
            .json({ message: "Username, email and password fields are required" });

    const [duplicate] = await pool.query(
        `SELECT * FROM ${usersTable} WHERE name=? or email=?`,
        [username, email]
    );
    console.log(duplicate);

    if (duplicate.length > 0)
        return res
            .status(409)
            .json({ message: "Duplicate username and/or email" });

    try {
        const hashedPwd = await hash(password);

        const [result] = await pool.query(
            `INSERT INTO ${usersTable} (name, email, password) VALUES (?, ?, ?)`,
            [username, email, hashedPwd]
        );

        console.log(result);
        console.log("success");
        res.json({ id: result.insertId, username, email });
    } catch (error) {
        res.status(404).json({ message: "Something went wrong", error: error });
        console.log(error);
    }
};

export const loginUser = async (req, res) => {
    console.log("authenticating user...");
    try {
        const [userData] = await pool.query(
            `SELECT * FROM ${usersTable} WHERE email=?`,
            [req.body.email]
        );
        console.log(req.body);
        console.log(userData);
        const user = userData[0];

        if (!user)
            return res.status(401).json({ message: "Invalid credentials" });

        const matched = await match(
            req.body.password,
            user.password
        );

        if (matched) {
            const token = createUserToken(user.id, user.name, user.email, user.is_admin)
            console.log("success");
            res.send({
                id: user.id,
                name: user.name,
                email: user.email,
                is_admin: user.is_admin,
                token: token
            });
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Something went wrong", error: error });
    }
};

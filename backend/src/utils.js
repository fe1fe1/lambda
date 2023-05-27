import { pool } from "./db.js";
import jwt from "jsonwebtoken";
import bcrypt, { compare } from "bcrypt";
import { config } from "dotenv";

// GENERIC QUERIES

export const getAllResources = (table) => {
    return async (req, res, next) => {
        console.log("utils");
        try {
            const [result] = await pool.query(`SELECT * FROM ${table}`);
            console.log(result);
            console.log("success");
            res.send(result);
            next();
        } catch (error) {
            res.status(500).json({ message: "500: Something went wrong", error: error });
            next(error);
        }
    }
};

export const getResourceById = (table) => {
    return async (req, res, next) => {
        console.log("utils");
        try {
            const [result] = await pool.query(
                `SELECT * FROM ${table} WHERE id = ?`,
                [req.params.id]
            );
            if (result.length <= 0) {
                return res.status(404).json({ message: `Resource not found in: ${table}` });
            }
            console.log(result);
            console.log("success");
            res.send(result);
            next()
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error: error });
            next(error);
        }
    }
};

export const deleteResourceById = (table) => {
    return async (req, res, next) => {
        console.log("utils");
        try {
            const [result] = await pool.query(
                `DELETE * FROM ${table} WHERE id = ?`,
                [req.params.id]
            );
            if (result.length <= 0) {
                return res.status(404).json({ message: `Resource not found in: ${table}` });
            }
            console.log(result);
            console.log("success");
            res.sendStatus(204);
            next()
        } catch (error) {
            res.status(500).json({ message: "Something went wrong", error: error });
            next(error);
        }
    }
};

// BCRYPT

export const hash = async (value) => {
    const hashedValue = await bcrypt.hash(value, 10);
    return hashedValue;
};

export const match = async (value, hashedValue) => {
    const matched = await bcrypt.compare(value, hashedValue);
    return matched;
}

// AUTH

export const createUserToken = async (id, name, email, is_admin) => {
    const token = jwt.sign(
        {
            id,
            name,
            email,
            is_admin,
        },
        process.env.JWT_KEY,
        {
            expiresIn: "48h",
        }
    );
    return token;
}

export const isAuth = async (req, res, next) => {
    const authCredential = req.headers.authorization;
    if (authCredential) {
        const token = token.slice(7, authCredential.length);
        jwt.verify(token, process.env.JWT_KEY, (error, decode) => {
            if (error)
                return res.status(401).json({ message: "Unauthorized" });

            req.user = decode;
            next();
            return;
        });
    } else {
        return res.status(401).json({ message: "No token supplied" });
    }
}

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.is_admin) {
        return next();
    }
    return res.status(401).json({ message: "Invalid admin token" });
}

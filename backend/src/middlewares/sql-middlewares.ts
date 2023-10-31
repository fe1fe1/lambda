import { pool } from "../db.js";

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
            res.status(500).json({
                message: "500: Something went wrong",
                error: error,
            });
            next(error);
        }
    };
};

export const getResourceById = (table) => {
    return async (req, res, next) => {
        console.log("utils");
        try {
            const [result] = await pool.query(
                `SELECT * FROM ${table} WHERE id=?`,
                [req.params.id]
            );
            if (result.length <= 0) {
                return res
                    .status(404)
                    .json({ message: `Resource not found in: ${table}` });
            }
            console.log(result);
            console.log("success");
            res.send(result);
            next();
        } catch (error) {
            res.status(500).json({
                message: "Something went wrong",
                error: error,
            });
            next(error);
        }
    };
};

export const deleteResourceById = (table) => {
    return async (req, res, next) => {
        console.log("utils");
        try {
            const [result] = await pool.query(
                `DELETE FROM ${table} WHERE id=?`,
                [req.params.id]
            );
            if (result.length <= 0) {
                return res
                    .status(404)
                    .json({ message: `Resource not found in: ${table}` });
            }
            console.log("success");
            res.sendStatus(204);
            next();
        } catch (error) {
            res.status(500).json({
                message: "Something went wrong",
                error: error,
            });
            next(error);
        }
    };
};

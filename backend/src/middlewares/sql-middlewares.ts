import { Request, Response, NextFunction } from "express";
import { pool } from "../db.js";

export const getAllResources = (table: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
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

export const getResourceById = (table: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log("utils");
        try {
            const [result]: any[] = await pool.query(
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

export const deleteResourceById = (table: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log("utils");
        try {
            const result = await pool.query(`DELETE FROM ${table} WHERE id=?`, [
                req.params.id,
            ]);
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

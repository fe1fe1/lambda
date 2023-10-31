var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { pool } from "../db.js";
export const getAllResources = (table) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("utils");
        try {
            const [result] = yield pool.query(`SELECT * FROM ${table}`);
            console.log(result);
            console.log("success");
            res.send(result);
            next();
        }
        catch (error) {
            res.status(500).json({
                message: "500: Something went wrong",
                error: error,
            });
            next(error);
        }
    });
};
export const getResourceById = (table) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("utils");
        try {
            const result = yield pool.query(`SELECT * FROM ${table} WHERE id=?`, [req.params.id]);
            if (result.length <= 0) {
                return res
                    .status(404)
                    .json({ message: `Resource not found in: ${table}` });
            }
            console.log(result);
            console.log("success");
            res.send(result);
            next();
        }
        catch (error) {
            res.status(500).json({
                message: "Something went wrong",
                error: error,
            });
            next(error);
        }
    });
};
export const deleteResourceById = (table) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("utils");
        try {
            const result = yield pool.query(`DELETE FROM ${table} WHERE id=?`, [
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
        }
        catch (error) {
            res.status(500).json({
                message: "Something went wrong",
                error: error,
            });
            next(error);
        }
    });
};

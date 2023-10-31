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
export const getUserShipping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getting shipping...");
    try {
        const [result] = yield pool.query(`SELECT * FROM shipping WHERE user_id=?`, [req.params.userId]);
        if (result.length <= 0) {
            return res.status(404).json({ message: `Shipping info not found` });
        }
        console.log(result);
        console.log("success");
        res.send(result[0]);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error });
        console.log(error);
    }
});
export const postUserShipping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("posting shipping...", req.body);
    const userId = req.params.userId;
    const { address, city, postalCode, country } = req.body;
    if (!address || !city || !postalCode || !country)
        return res.status(409).json({ message: "Missing fields" });
    const values = [address, city, postalCode, country];
    try {
        const [repeated] = yield pool.query(`SELECT * FROM shipping WHERE user_id=?
                                    AND address=?
                                    AND city=?
                                    AND postal_code=?
                                    AND country=?`, [userId, ...values]);
        if (repeated[0])
            return res.json({ id: repeated[0].id });
    }
    catch (error) {
        console.log(error);
        return res.status(502).json({ message: "Something went wrong", error: error });
    }
    try {
        const [result] = yield pool.query(`INSERT INTO shipping (user_id, address, city, postal_code, country) VALUES (?)`, [[userId, ...values]]);
        console.log(result);
        console.log("success");
        res.json({ id: result.insertId });
    }
    catch (error) {
        res.status(502).json({ message: "Something went wrong", error: error });
        console.log(error);
    }
});
export const updateUserShipping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("updating shipping...");
    const userId = req.params.userId;
    const { address, city, postal_code, country } = req.body;
    if (!address || !city || !postal_code || !country)
        return res.status(409).json({ message: "Missing fields" });
    try {
        const [result] = yield pool.query(`UPDATE shipping 
             SET address=?, city=?, postal_code=?, country=?
             WHERE user_id=?`, [address, city, postal_code, country, userId]);
        console.log(result);
        console.log("success");
        res.send({ userId, address, city, postal_code, country });
    }
    catch (error) {
        res.status(404).json({ message: "Something went wrong", error: error });
        console.log(error);
    }
});
export const deleteUserShipping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("deleting shipping...");
    try {
        const [result] = yield pool.query(`DELETE * FROM shipping WHERE user_id=?`, [req.params.userId]);
        if (result.length <= 0) {
            return res.status(404).json({ message: `Shipping info not found` });
        }
        console.log(result);
        console.log("success");
        res.send(result);
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error });
        next(error);
    }
});

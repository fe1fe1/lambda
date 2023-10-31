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
import { createUserToken, hash, match } from "../utils.js";
const usersTable = "user";
export const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("posting user...");
    const { username, email, password } = req.body;
    if (!username || !email || !password)
        return res
            .status(409)
            .json({ message: "Username, email and password fields are required" });
    const [duplicate] = yield pool.query(`SELECT * FROM ${usersTable} WHERE name=? or email=?`, [username, email]);
    if (duplicate.length > 0) {
        console.log(duplicate);
        return res
            .status(409)
            .json({ message: "Duplicate username and/or email" });
    }
    try {
        const hashedPwd = yield hash(password);
        const [result] = yield pool.query(`INSERT INTO ${usersTable} (name, email, password) VALUES (?, ?, ?)`, [username, email, hashedPwd]);
        console.log('REGISTER RESULTS: ', result);
        console.log("success");
        res.json({ id: result.insertId, username, email });
    }
    catch (error) {
        res.status(404).json({ message: "Something went wrong", error: error });
        console.log(error);
    }
});
export const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("authenticating user...");
    try {
        const [userData] = yield pool.query(`SELECT * FROM ${usersTable} WHERE email=?`, [req.body.email]);
        console.log('LOGIN REQUEST BODY: ', req.body);
        console.log('USER FOUND BY EMAIL: ', userData);
        const user = userData[0];
        if (!user)
            return res.status(401).json({ message: "Invalid credentials" });
        const matched = yield match(req.body.password, user.password);
        if (matched) {
            const token = createUserToken(user.id, user.name, user.email, user.is_admin);
            console.log("success");
            res.send({
                id: user.id,
                name: user.name,
                email: user.email,
                is_admin: user.is_admin,
                token: token
            });
        }
        else {
            res.status(401).json({ message: "Unauthorized" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: "Something went wrong", error: error });
    }
});

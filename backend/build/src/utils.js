var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// BCRYPT
export const hash = (value) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedValue = yield bcrypt.hash(value, 10);
    return hashedValue;
});
export const match = (value, hashedValue) => __awaiter(void 0, void 0, void 0, function* () {
    const matched = yield bcrypt.compare(value, hashedValue);
    return matched;
});
// AUTH
export const createUserToken = (id, name, email, is_admin) => __awaiter(void 0, void 0, void 0, function* () {
    const token = jwt.sign({
        id,
        name,
        email,
        is_admin,
    }, process.env.JWT_KEY, {
        expiresIn: "48h",
    });
    return token;
});

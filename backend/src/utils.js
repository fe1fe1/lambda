import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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

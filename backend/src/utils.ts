import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// BCRYPT
export const hash = async (value: string) => {
    const hashedValue = await bcrypt.hash(value, 10);
    return hashedValue;
};

export const match = async (value: string, hashedValue: string) => {
    const matched = await bcrypt.compare(value, hashedValue);
    return matched;
};

// AUTH
export const createUserToken = async (
    id: number,
    name: string,
    email: string,
    is_admin: number
) => {
    const token = jwt.sign(
        {
            id,
            name,
            email,
            is_admin,
        },
        process.env.JWT_KEY as string,
        {
            expiresIn: "48h",
        }
    );
    return token;
};

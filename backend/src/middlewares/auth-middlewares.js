import jwt from "jsonwebtoken";

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

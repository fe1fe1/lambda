import express from "express";

const router = express.Router();

export const getProducts = async (req, res) => {
    try {
        res.status(200).json({ message: "success" });
    } catch (error) {
        res.status(404).json({ message: "request error" });
    }
};
export default router;

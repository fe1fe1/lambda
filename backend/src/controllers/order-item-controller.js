import { pool } from "../db.js";

export const getOrderItems = async (req, res) => {
    console.log("getting order items...");
    try {
        const [result] = await pool.query(
            "SELECT * FROM order_item WHERE order_id=?",
            [req.params.orderId]
        );
        if (result.length <= 0) {
            return res.status(404).json({ message: "No order items were found" });
        }
        console.log(result);
        console.log("success");
        res.send(result);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error });
        console.log(error);
    }

};

export const getOrderItem = async (req, res) => {
    console.log("getting order item...");
};

export const postOrderItem = async (req, res) => {
    console.log("posting order items...");
};

export const updateOrderItem = async (req, res) => {
    console.log("updating order item...");
};

export const deleteOrderItem = async (req, res) => {
    console.log("deleting order item...");
};


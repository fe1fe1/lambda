import { pool } from "../db.js";

const joinQuery = `SELECT purchase_order.id,
                          user.name,
                          user.email,
                          shipping.address,
                          shipping.city,
                          shipping.postal_code,
                          shipping.country,
                          payment.method,
                          purchase_order.items_price, 
                          purchase_order.shipping_price,
                          purchase_order.total_price,
                          purchase_order.is_paid,
                          purchase_order.paid_at,
                          purchase_order.is_delivered,
                          purchase_order.delivered_at
                   FROM purchase_order 
                   INNER JOIN user ON purchase_order.user_id=user.id
                   INNER JOIN shipping ON purchase_order.user_id=shipping.user_id
                   INNER JOIN payment ON purchase_order.user_id=payment.user_id`;

export const getUserOrders = async (req, res) => {
    console.log("getting orders...");
    const userId = req.params.userId;
    try {
        const [result] = await pool.query(
            `${joinQuery} WHERE purchase_order.user_id=?`,
            [userId]
        );
        if (result.length <= 0) {
            return res.status(404).json({ message: `No orders where found` });
        }
        console.log(result);
        console.log("success");
        res.send(result);

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error });
        console.log(error);
    }
};

export const getUserOrder = async (req, res) => {
    console.log("getting order...");
    const orderId = req.params.orderId;
    try {
        const [result] = await pool.query(
            `${joinQuery} WHERE purchase_order.id=?`,
            [orderId]
        );
        if (result.length <= 0) {
            return res.status(404).json({ message: `Order not found ${orderId}` });
        }
        console.log(result);
        console.log("success");
        res.send(result);

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error });
        console.log(error);
    }
};

export const postUserOrder = async (req, res) => {
    console.log("posting orders...");
    const userId = req.params.userId
    const { itemsPrice, shippingPrice, totalPrice } = req.body;
    if (!userId || !itemsPrice || !shippingPrice || !totalPrice)
        return res.status(409).json({ message: "missing fields" })
    try {
        const [userInfo] = await pool.query(`
            SELECT 
                shipping.id AS shippingId,
                payment.id AS paymentId
            FROM user
            INNER JOIN shipping ON user.id=shipping.user_id
            INNER JOIN payment ON user.id=payment.user_id
            WHERE user.id=?`, [userId]
        );
        const [result] = await pool.query(`
            INSERT INTO purchase_order (user_id,shipping_id,payment_id,items_price,shipping_price,total_price)
            VALUES (?)`,
            [[userId, userInfo[0].shippingId, userInfo[0].paymentId, itemsPrice, shippingPrice, totalPrice]]
        );
        console.log(result);
        console.log("success");
        res.send({ orderId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error });
        console.log(error);
    }

};

export const deleteUserOrder = async (req, res) => {
    console.log("deleting orders... ", req.params.orderId);
    try {
        const [result] = await pool.query(
            `DELETE FROM purchase_order WHERE id=?`,
            [req.params.orderId]
        );
        if (result.length <= 0) {
            return res.status(404).json({ message: `Order not found` });
        }
        console.log("success");

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error });
    }
};


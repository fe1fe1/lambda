import { pool } from "../db.js";
import { handleOrderPrice, handleUserInfo } from "../handlers/order-handlers.js";

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
            return res.status(404).json({ message: "No orders were found" });
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
    console.log("posting order...");

    const userId = req.params.userId;
    if (!userId)
        return res.status(409).json({ message: "Missing user id" });

    const orderItems = req.body.orderItems;
    if (!orderItems)
        return res.status(409).json({ message: "Missing items" });
    orderItems.forEach(item => {
        if (!item.productId || !item.quantity){
            return res.status(409).json({ message: "Missing item data" });
        }
    });

    try {
        const { shippingId, paymentId } = await handleUserInfo(userId);
        const { itemsPrice, shippingPrice, totalPrice } = await handleOrderPrice(orderItems);

        const [orderResult] = await pool.query(`
                    INSERT INTO purchase_order 
                    (user_id,shipping_id,payment_id,items_price,shipping_price,total_price)
                    VALUES (?)`,
            [[userId, shippingId, paymentId, itemsPrice, shippingPrice, totalPrice]]
        );

        const orderItemsArray = orderItems.map((item) =>
            [orderResult.insertId, item.productId, item.quantity]
        )

        const [result] = await pool.query(`
                    INSERT INTO order_item (order_id,product_id,qty)
                    VALUES ?`,
            [orderItemsArray]
        );

        console.log("success: ", result);
        res.send({ orderId: orderResult.insertId });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error });
        console.log(error);
    }

};

export const deleteUserOrder = async (req, res) => {
    console.log("deleting order... ", req.params.orderId);
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


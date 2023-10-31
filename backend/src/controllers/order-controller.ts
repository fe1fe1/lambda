import { pool } from "../db.js";
import { handleOrderPrice } from "../handlers/order-handlers.js";
import { Request, Response } from "express";

const joinQuery = `SELECT purchase_order.id,
                          user.name,
                          user.email,
                          shipping.address,
                          shipping.city,
                          shipping.postal_code,
                          shipping.country,
                          purchase_order.items_price, 
                          purchase_order.shipping_price,
                          purchase_order.total_price,
                          purchase_order.is_paid,
                          purchase_order.paid_at,
                          purchase_order.is_delivered,
                          purchase_order.delivered_at
                   FROM purchase_order 
                   INNER JOIN user ON purchase_order.user_id=user.id
                   INNER JOIN shipping ON purchase_order.shipping_id=shipping.id`;

export const getAllOrders = async (req: Request, res: Response) => {
    console.log("getting all orders");
    try {
        const [result] = await pool.query(`${joinQuery}`);
        console.log(result);
        res.send(result);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error });
        console.log(error);
    }
};

export const getUserOrders = async (req: Request, res: Response) => {
    console.log("getting orders...");

    const userId = req.params.userId;
    console.log("user id: ", userId);

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

export const getUserOrder = async (req: Request, res: Response) => {
    console.log("getting order...");

    const orderId = req.params.orderId;

    try {
        const [result] = await pool.query(
            `${joinQuery} WHERE purchase_order.id=?`,
            [orderId]
        );
        if (result.length <= 0) {
            return res
                .status(404)
                .json({ message: `Order not found ${orderId}` });
        }
        console.log(result);
        console.log("success");
        res.send(result);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error });
        console.log(error);
    }
};

export const postUserOrder = async (req: Request, res: Response) => {
    console.log("posting order...");
    console.log("****REQUEST BODY****: ", req.body);

    const userId = req.params.userId;
    if (!userId) return res.status(409).json({ message: "Missing user id" });

    const shippingId = req.body.shippingId;
    if (!shippingId)
        return res.status(409).json({ message: "Missing shipping id" });

    const orderItems = req.body.orderItems;
    if (!orderItems) return res.status(409).json({ message: "Missing items" });

    try {
        const { itemsPrice, shippingPrice, totalPrice } =
            await handleOrderPrice(orderItems);

        const [orderResult] = await pool.query(
            `
                    INSERT INTO purchase_order 
                    (user_id,shipping_id,items_price,shipping_price,total_price,created_at)
                    VALUES (?,now())`,
            [[userId, shippingId, itemsPrice, shippingPrice, totalPrice]]
        );

        const orderItemsArray = orderItems.map((item) => [
            orderResult.insertId,
            item.id,
            item.quantity,
        ]);

        const [result] = await pool.query(
            `
                    INSERT INTO order_item (order_id,product_id,qty)
                    VALUES ?`,
            [orderItemsArray]
        );

        console.log("success: ", result);
        res.send({ id: orderResult.insertId });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error });
        console.log(error);
    }
};

export const deleteUserOrder = async (req: Request, res: Response) => {
    console.log("deleting order... ", req.params.orderId);
    try {
        const [result] = await pool.query(
            `DELETE FROM purchase_order WHERE id=?`,
            [req.params.orderId]
        );
        if (result.length <= 0) {
            return res.status(404).json({ message: `Order not found` });
        }
        console.log("success", result);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error });
    }
};

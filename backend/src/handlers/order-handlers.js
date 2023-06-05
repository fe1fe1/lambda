import { pool } from "../db.js";

export const handleUserInfo = async (userId) => {
    const [userInfo] = await pool.query(`
            SELECT 
                shipping.id AS shippingId,
                payment.id AS paymentId
            FROM user
            INNER JOIN shipping ON user.id=shipping.user_id
            INNER JOIN payment ON user.id=payment.user_id
            WHERE user.id=?`, [userId]
    );
    return { shippingId: userInfo[0].shippingId, paymentId: userInfo[0].paymentId };
};

export const handleOrderPrice = async (orderItems) => {

    const totalItemsPrices = await Promise.all(
        orderItems.map(async (item) => {
            const [result] = await pool.query(
                `SELECT price*? AS totalItemPrice FROM product WHERE id=?`,
                [item.quantity, item.productId],)
            return result[0].totalItemPrice;
        }
        ));

    const itemsPrice = totalItemsPrices.reduce((acc, curr) => acc + curr);
    const shippingPrice = itemsPrice > 1000 ? 0 : 15;

    console.log(itemsPrice, shippingPrice);

    return {
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        totalPrice: itemsPrice + shippingPrice
    }
};

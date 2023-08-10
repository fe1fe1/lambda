import { pool } from "../db.js";

export const handleOrderPrice = async (orderItems) => {

    const totalItemsPrices = await Promise.all(
        orderItems.map(async (item) => {
            const [result] = await pool.query(
                `SELECT price*? AS totalItemPrice FROM product WHERE id=?`,
                [item.quantity, item.id],)
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

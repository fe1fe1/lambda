import { pool } from "../db.js";

type Item = {
    id: number;
    quantity: number;
};

export const handleOrderPrice = async (orderItems: Array<Item>) => {
    const totalItemsPrices = await Promise.all(
        orderItems.map(async (item: Item) => {
            const result: Array<any> = await pool.query(
                `SELECT price*? AS totalItemPrice FROM product WHERE id=?`,
                [item.quantity, item.id]
            );
            return result[0].totalItemPrice;
        })
    );

    const itemsPrice = totalItemsPrices.reduce((acc, curr) => acc + curr);
    const shippingPrice = itemsPrice > 1000 ? 15 : 0;

    console.log(itemsPrice, shippingPrice);

    return {
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        totalPrice: itemsPrice + shippingPrice,
    };
};

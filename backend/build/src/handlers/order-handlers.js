var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { pool } from "../db.js";
export const handleOrderPrice = (orderItems) => __awaiter(void 0, void 0, void 0, function* () {
    const totalItemsPrices = yield Promise.all(orderItems.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield pool.query(`SELECT price*? AS totalItemPrice FROM product WHERE id=?`, [item.quantity, item.id]);
        return result[0].totalItemPrice;
    })));
    const itemsPrice = totalItemsPrices.reduce((acc, curr) => acc + curr);
    const shippingPrice = itemsPrice > 1000 ? 15 : 0;
    console.log(itemsPrice, shippingPrice);
    return {
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        totalPrice: itemsPrice + shippingPrice,
    };
});

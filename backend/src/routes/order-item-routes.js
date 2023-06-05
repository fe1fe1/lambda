import { Router } from "express";
import {
    getOrderItems,
    getOrderItem,
    postOrderItem,
    updateOrderItem,
    deleteOrderItem
} from "../controllers/order-item-controller.js";

const router = Router();

router.get("/user/order/:orderId/order-items",);
router.get("/user/order/:orderId/order-item/:orderItemId",);
router.post("/user/order/:orderId/order-item",);
router.patch("/user/order/:orderId/order-item/:orderItemId",);
router.delete("/user/order/:orderId/order-item/:orderItemId",);

export default router;

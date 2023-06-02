import { Router } from "express";
import {
    getUserOrders,
    getUserOrder,
    postUserOrder,
    deleteUserOrder
} from "../controllers/order-controller.js";

const router = Router();

router.get("/user/:userId/orders", getUserOrders);
router.get("/user/order/:orderId", getUserOrder);
router.post("/user/:userId/order", postUserOrder);
router.delete("/user/order/:orderId", deleteUserOrder);

export default router;

import { Router } from "express";
import { getUserOrders, getUserOrder, postUserOrder, deleteUserOrder, getAllOrders } from "../controllers/order-controller.js";
const router = Router();
router.get("/orders", getAllOrders);
router.get("/orders/:userId", getUserOrders);
router.get("/order/:orderId", getUserOrder);
router.post("/order/:userId", postUserOrder);
router.delete("/order/:orderId", deleteUserOrder);
export default router;

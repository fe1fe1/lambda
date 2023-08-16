import { Router } from "express";
import { postUserPayment } from "../controllers/payment-controller.js";

const router = Router();

router.post("/user/order/:orderId/create-payment-intent", postUserPayment);

export default router;

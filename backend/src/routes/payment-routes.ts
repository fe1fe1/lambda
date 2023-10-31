import { Router } from "express";
import { postUserPayment } from "../controllers/payment-controller.js";

const router = Router();

router.post("/payment/:orderId/create-payment-intent", postUserPayment);

export default router;

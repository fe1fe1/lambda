import { Router } from "express";
import { postPaymentIntent } from "../../controllers/dev/payment-dev-controllers.js";

const router = Router();

router.post("/payment/create-payment-intent", postPaymentIntent);

export default router;

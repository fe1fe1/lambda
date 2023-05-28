import { Router } from "express";
import {
    getUserPayment,
    postUserPayment,
    updateUserPayment,
    deleteUserPayment
} from "../controllers/payment-controller.js";

const router = Router();

router.get("/user/:userId/payment", getUserPayment);
router.post("/user/:userId/payment", postUserPayment);
router.patch("/user/:userId/payment", updateUserPayment);
router.delete("/user/:userId/payment", deleteUserPayment);

export default router;

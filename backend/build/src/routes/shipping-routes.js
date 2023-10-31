import { Router } from "express";
import { getUserShipping, postUserShipping, updateUserShipping, deleteUserShipping } from "../controllers/shipping-controller.js";
const router = Router();
router.get("/user/:userId/shipping", getUserShipping);
router.post("/user/:userId/shipping", postUserShipping);
router.patch("/user/:userId/shipping", updateUserShipping);
router.delete("/user/:userId/shipping", deleteUserShipping);
export default router;

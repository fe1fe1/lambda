import { Router } from "express";
import { getAllResources, getResourceById, deleteResourceById } from "../utils.js";
import {
    registerUser,
    loginUser,
} from "../controllers/users-controller.js";
import {
    getUserPayment,
    postUserPayment,
    updateUserPayment,
    deleteUserPayment
} from "../controllers/payment-controller.js";

const router = Router();

// **** ROUTES **** 

//--user-- 
router.get("/users", getAllResources("user"));
router.get("/user/:id", getResourceById("user"));
router.delete("/user/:id", deleteResourceById("user"));
router.post("/user", registerUser);
router.post("/user/login", loginUser);

//--payment--
router.get("/user/:userId/payment", getUserPayment);
router.post("/user/:userId/payment", postUserPayment);
router.patch("/user/:userId/payment", updateUserPayment);
router.delete("/user/:userId/payment", deleteUserPayment);


export default router;

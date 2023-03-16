import { Router } from "express";
import {
    getUsers,
    getUser,
    deleteUser,
    signupUser,
} from "../controllers/users-controller.js";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.delete("/users/:id", deleteUser);
router.post("/users", signupUser);

export default router;

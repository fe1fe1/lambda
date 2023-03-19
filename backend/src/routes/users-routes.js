import { Router } from "express";
import {
    getUsers,
    getUser,
    deleteUser,
    registerUser,
    loginUser,
} from "../controllers/users-controller.js";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.delete("/users/:id", deleteUser);
router.post("/users", registerUser);
router.post("/users/login", loginUser);

export default router;

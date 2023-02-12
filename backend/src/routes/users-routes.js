import { Router } from "express";
import {
    getUsers,
    getUser,
    deleteUser,
    createUser,
} from "../controllers/users-controller.js";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.delete("/users/:id", deleteUser);
router.post("/users", createUser);

export default router;

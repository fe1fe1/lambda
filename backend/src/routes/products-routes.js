import { Router } from "express";

import { getAllResources, getResourceById } from "../utils.js";

const router = Router();

router.get("/products", getAllResources("product"));
router.get("/product/:id", getResourceById("product"));

export default router;

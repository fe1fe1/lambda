import { Router } from "express";

import { getAllResources, getResourceById } from "../middlewares/sql-middlewares.js";

const router = Router();

router.get("/products", getAllResources("product"));
router.get("/product/:id", getResourceById("product"));

export default router;

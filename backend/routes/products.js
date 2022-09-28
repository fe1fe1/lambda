import express from "express";

import { getProducts } from "../controllers/products-controller.js";

const productRouter = express.Router();

productRouter.get("/", getProducts);

export default productRouter;

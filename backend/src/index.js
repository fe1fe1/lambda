import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRouter from "./routes/product-routes.js";
import userRouter from "./routes/user-routes.js";
import paymentRouter from "./routes/payment-routes.js";
import shippingRouter from "./routes/shipping-routes.js";


dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/api", productRouter);
app.use("/api", userRouter);
app.use("/api", paymentRouter);
app.use("/api", shippingRouter);

// server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});

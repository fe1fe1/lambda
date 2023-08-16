import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRouter from "./routes/product-routes.js";
import userRouter from "./routes/user-routes.js";
import paymentRouter from "./routes/payment-routes.js";
import shippingRouter from "./routes/shipping-routes.js";
import orderRouter from "./routes/order-routes.js";

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
app.use("/api", orderRouter);

// Stripe webhook
app.post('/webhook', async (req, res) => {
    let data, eventType;

    // Check if webhook signing is configured.
    if (process.env.STRIPE_WEBHOOK_SECRET) {
        // Retrieve the event by verifying the signature using the raw body and secret.
        let event;
        let signature = req.headers['stripe-signature'];
        try {
            event = stripe.webhooks.constructEvent(
                req.rawBody,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (err) {
            console.log(`⚠️  Webhook signature verification failed.`);
            return res.sendStatus(400);
        }
        data = event.data;
        eventType = event.type;
    } else {
        // Webhook signing is recommended, but if the secret is not configured in `config.js`,
        // we can retrieve the event data directly from the request body.
        data = req.body.data;
        eventType = req.body.type;
    }

    if (eventType === 'payment_intent.succeeded') {
        // Funds have been captured
        // Fulfill any orders, e-mail receipts, etc
        // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
        console.log('💰 Payment captured!');
    } else if (eventType === 'payment_intent.payment_failed') {
        console.log('❌ Payment failed.');
    }
    res.sendStatus(200);
});

// server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server at http://localhost:${port}`);
});

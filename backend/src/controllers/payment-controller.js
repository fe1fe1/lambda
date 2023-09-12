import { pool } from "../db.js";
import Stripe from "stripe";
const stripe = new Stripe("sk_test_51NOWgjLxeQ3x4qvChsmzEiqvcTqSpyqtenVLJhjpv6zzM1wmU0eobzdd81iqIFkMpcVM3oQC9wzE8u98uMVN1SVW00Fav9Kht6");

export const postUserPayment = async (req, res) => {
    console.log("posting payment...", req.body)

    const orderId = req.params.orderId;

    if (!orderId)
        return res.status(409).json({ message: "Missing order id" })

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            confirm: true,
            amount: req.body.paymentAmount,
            currency: 'usd',
            automatic_payment_methods: { enabled: true },
            payment_method: req.body.paymentMethodId,
            return_url: 'https://example.com/order/123/complete',
            use_stripe_sdk: true,
            mandate_data: {
                customer_acceptance: {
                    type: "online",
                    online: {
                        ip_address: req.ip,
                        user_agent: req.get("user-agent"),
                    },
                },
            },
        });

        console.log(paymentIntent);

        if (paymentIntent?.status === "succeeded") {
            const [updateOrderPayment] = await pool.query(
                `UPDATE purchase_order SET paid_at=now(), is_paid=1, stripe_payment_id=? WHERE id=?`, [paymentIntent.id, orderId]
            );
            console.log('PATMENT UPDATE: ', updateOrderPayment);
        }

        res.send({
            clientSecret: paymentIntent.client_secret,
            nextAction: paymentIntent.next_action,
            status: paymentIntent.status,
        });
    } catch (error) {
        res.status(503).json({ message: "Something went wrong", error: error });
        console.log(error);
    }
};


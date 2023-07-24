import Stripe from "stripe";
const stripe = new Stripe("sk_test_51NOWgjLxeQ3x4qvChsmzEiqvcTqSpyqtenVLJhjpv6zzM1wmU0eobzdd81iqIFkMpcVM3oQC9wzE8u98uMVN1SVW00Fav9Kht6");

export const postPaymentIntent = async (req, res, next) => {
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
        res.send({
            clientSecret: paymentIntent.client_secret,
            nextAction: paymentIntent.next_action,
        });
    } catch (error) {
        console.log(error);
        res.json({ error: error })
    }
}

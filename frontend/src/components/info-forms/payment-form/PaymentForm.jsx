import {
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router";
import { usePayUserOrderMutation } from "../../../features/orders/ordersApiSlice";
import "../InfoForms.scss";

const PaymentForm = (props) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [payOrder, { isLoading }] = usePayUserOrderMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const submitError = await elements.submit();
        if (submitError) {
            console.log("subtmit error: ", submitError);
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            elements,
        });

        if (error) {
            console.log("payment method creation error: ", error);
            return;
        }

        console.log(
            "PARAMS: ",
            props.orderId,
            paymentMethod.id,
            props.paymentAmount
        );

        const paymentResponse = await payOrder({
            orderId: props.orderId,
            paymentMethodId: paymentMethod.id,
            paymentAmount: props.paymentAmount,
        }).unwrap();

        if (paymentResponse?.status === "succeeded") {
            navigate("/");
        }
    };

    return (
        <form className="checkout-form block-container" onSubmit={handleSubmit}>
            <h3>Payment</h3>
            {isLoading ? (
                <p>Sending Payment...</p>
            ) : (
                <>
                    <PaymentElement />
                    <div
                        className="submit-container"
                        style={{ padding: "1rem" }}
                    >
                        <button className="btn" disabled={!stripe}>
                            Pay and Finish
                        </button>
                    </div>
                </>
            )}
        </form>
    );
};

export default PaymentForm;

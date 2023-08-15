import { useEffect} from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import PaymentForm from "../../components/info-forms/payment-form/PaymentForm";
import PaymentFormDev from "../../components/info-forms/payment-form/PaymentFormDev";
import { selectValidShipping } from "../../features/shipping/shippingSlice";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { selectCartItems } from "../../features/cart/cartSlice";

const stripePromise = loadStripe('pk_test_51NOWgjLxeQ3x4qvCg4JM7kucXskGYHFDtYmglhtWgXIDeNnFk0IDXAGsPKCk52BAuolozOi33Jq9NxIshq7fLeQq00RyWesYzR');

const options = {
    mode: 'payment', 
    amount: null, 
    currency: 'usd',
    paymentMethodCreation: 'manual',
    appearance:{
        rules:{
            '.Input:focus':{
                outline:'2px solid #ff7b00',
            },
        },
        variables:{
            colorPrimary: '#ff7b00',
        },
    }, 
};

const CheckoutPayment = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const fromCheckoutOrderInfo = location.state && location.state.fromCheckoutOrderInfo;
    const orderTotalPrice = location?.state?.orderTotalPrice;
    const orderId = location?.state?.orderId;

    options.amount = orderTotalPrice;

    useEffect(() => {
        if (!fromCheckoutOrderInfo)
            navigate('/cart');
    }, [fromCheckoutOrderInfo, navigate])


    return (
        <div>
            <Elements stripe={stripePromise} options={options}>
                <PaymentFormDev paymentAmount={orderTotalPrice}/> 
            </Elements>
        </div>
    )
}

export default CheckoutPayment

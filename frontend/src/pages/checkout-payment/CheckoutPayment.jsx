import { useEffect} from "react";
import { useLocation, useNavigate } from "react-router";
import PaymentForm from "../../components/info-forms/payment-form/PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

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

    const fromAuth = location.state && (location.state.fromCheckoutOrderInfo || location.state.fromOrdersList);
    const orderTotalPrice = location?.state?.orderTotalPrice;
    const orderId = location?.state?.orderId;

    options.amount = orderTotalPrice;

    useEffect(() => {
        if (!fromAuth)
            navigate('/cart');
    }, [fromAuth, navigate])

    return (
        <div>
            <Elements stripe={stripePromise} options={options}>
                <PaymentForm paymentAmount={orderTotalPrice} orderId={orderId}/> 
            </Elements>
        </div>
    )
}

export default CheckoutPayment;

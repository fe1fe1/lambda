import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import PaymentForm from "../../components/info-forms/payment-form/PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import "./CheckoutPayment.scss";

const stripePromise = loadStripe(
    "pk_test_51NOWgjLxeQ3x4qvCg4JM7kucXskGYHFDtYmglhtWgXIDeNnFk0IDXAGsPKCk52BAuolozOi33Jq9NxIshq7fLeQq00RyWesYzR"
);

const options = {
    mode: "payment",
    amount: null,
    currency: "usd",
    paymentMethodCreation: "manual",
    appearance: {
        rules: {
            ".Input:focus": {
                outline: "2px solid #ff7b00",
            },
        },
        variables: {
            colorPrimary: "#ff7b00",
        },
    },
};

const CheckoutPayment = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const fromAuth =
        location.state &&
        (location.state.fromCheckoutOrderInfo || location.state.fromOrdersList);
    const orderTotalPrice = location?.state?.orderTotalPrice;
    const orderId = location?.state?.orderId;

    options.amount = orderTotalPrice;

    useEffect(() => {
        if (!fromAuth) navigate("/cart");
    }, [fromAuth, navigate]);

    return (
        <div className="navbar-margin">
            <div className="payment-container">
                <div className="payment-form">
                    <Elements stripe={stripePromise} options={options}>
                        <PaymentForm
                            paymentAmount={orderTotalPrice}
                            orderId={orderId}
                        />
                    </Elements>
                </div>
                <div className="suggestion">
                    <p className="suggestion-text">
                        <FontAwesomeIcon
                            icon={faCircleExclamation}
                            style={{ color: "#000000" }}
                            className="suggestion-icon"
                            size="l"
                        />
                        Demo card info. for Succesful Payment:
                        <b />
                        <ul>
                            <li>
                                <p>- 4242 4242 4242 4242 (Card Number)</p>
                            </li>
                            <li>
                                <p>- 4/24 (Expiration)</p>
                            </li>
                            <li>
                                <p>- 424 (CVC)</p>
                            </li>
                            <li>
                                <p>- Any (Country)</p>
                            </li>
                        </ul>
                    </p>
                    <p className="suggestion-text">
                        <FontAwesomeIcon
                            icon={faCircleExclamation}
                            style={{ color: "#000000" }}
                            className="suggestion-icon"
                            size="l"
                        />
                        This website is a personal project for learning purposes
                        only. Please do not give real personal information. All
                        information could be seen by users with Admin role
                        (including the one provided for demo purposes).
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPayment;

import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import ShippingForm from "../../components/info-forms/shipping-form/ShippingForm";
import "./CheckoutShipping.scss";

const CheckoutShipping = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const fromCart = location.state && location.state.fromCart;

    useEffect(() => {
        if (!fromCart) {
            navigate("/cart");
        }
    }, [fromCart, navigate]);

    const handleShippingSubmit = () => {
        navigate("/checkout-order-info", {
            state: { fromCheckoutShipping: true },
        });
    };

    return (
        <div className="navbar-margin">
            <div className="checkout-shipping">
                <div className="shipping-form">
                    <ShippingForm onSubmit={handleShippingSubmit} />
                </div>
                <div className="suggestion">
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

export default CheckoutShipping;

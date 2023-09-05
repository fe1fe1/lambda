import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import ShippingForm from "../../components/info-forms/shipping-form/ShippingForm";

const CheckoutShipping = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const fromCart = location.state && location.state.fromCart;

    useEffect(() => {
        if(!fromCart){
            navigate('/cart');
        }
    }, [fromCart, navigate])

    const handleShippingSubmit = () =>{
        navigate('/checkout-order-info', { state: { fromCheckoutShipping: true } });
    };

    return (
        <div className="navbar-margin">
            <ShippingForm onSubmit={handleShippingSubmit}/> 
        </div>
    )
}

export default CheckoutShipping

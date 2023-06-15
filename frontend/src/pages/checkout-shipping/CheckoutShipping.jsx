import { useNavigate } from "react-router";
import ShippingForm from "../../components/info-forms/shipping-form/ShippingForm";

const CheckoutShipping = () => {
    const navigate = useNavigate();

    const handleShippingSubmit = () =>{
        navigate('/checkout-payment');
    };

    return (
        <div>
            <ShippingForm onSubmit={handleShippingSubmit}/> 
        </div>
    )
}

export default CheckoutShipping

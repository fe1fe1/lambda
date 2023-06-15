import { useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import PaymentForm from "../../components/info-forms/payment-form/PaymentForm";
import { selectValidShipping } from "../../features/shipping/shippingSlice";

const CheckoutPayment = () => {
    const stepCompleted = useSelector(selectValidShipping);
    console.log(stepCompleted)
    const navigate = useNavigate();

    useEffect(() => {
        if (!stepCompleted)
            navigate('/checkout-shipping');
      return () => {

      }
    }, [stepCompleted, navigate])


    return (
        <div>
            <PaymentForm/> 
        </div>
    )
}

export default CheckoutPayment

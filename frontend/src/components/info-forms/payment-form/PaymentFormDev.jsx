import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import "../InfoForms.scss";

const PaymentFormDev = (props) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) =>{
        e.preventDefault(); 
        if (!stripe || !elements){
            return;
        }
        const submitError = await elements.submit();
        if(submitError){
            console.log("subtmit error: ",submitError);
        }
        
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            elements,
        });
        
        if (error){
            console.log("payment method creation error: ",error);    
            return;
        }
        const res = await fetch("http://localhost:5000/api/dev/payment/create-payment-intent",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                paymentMethodId: paymentMethod.id,
                paymentAmount: props.paymentAmount,
            }),
        });

        const data = await res.json();

        console.log("data :", data);
    };
        
    return (
        <form className="checkout-form block-container" onSubmit={handleSubmit}>
            <h3>Payment</h3>
            <PaymentElement/>
            <div className="submit-container" style={{padding:'1rem'}}>
                <button className="btn" disabled={!stripe}>Submit</button>
            </div>
        </form>
    )
}

export default PaymentFormDev

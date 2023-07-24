import { useState } from "react";
import "../InfoForms.scss";

const PaymentForm = (props) => {
    const [cardName, setCardName] = useState(null);
    const [cardNumber, setCardNumber] = useState(null);
    const [expMonth, setExpMonth] = useState(null);
    const [expYear, setExpYear] = useState(null);
    const [cvvCode, setCvvCode] = useState(null);

    const cardNameOnChange = (e) => { setCardName(e.target.value) };
    const cardNumberOnChange = (e) => { setCardNumber(e.target.value) };
    const expMonthOnChange = (e) => { setExpMonth(e.target.value) };
    const expYearOnChange = (e) => { setExpYear(e.target.value) };
    const cvvCodeOnChange = (e) => { setCvvCode(e.target.value) };

    const handleOnSubmit = (e) =>{
        e.preventDefault();

        if (props?.onSubmit)
            props.onSubmit(); 
        
    };

    return (
        <form className="checkout-form block-container" onSubmit={(e) => handleOnSubmit(e)}>
            <div className="col-50">
                <h3>Payment</h3>
                <label htmlFor="cname">Name on Card</label>
                <input 
                    type="text" 
                    id="cname" 
                    name="cardname" 
                    placeholder="John More Doe"
                    value={cardName}
                    onChange={cardNameOnChange}
                ></input>
                <label htmlFor="ccnum">Credit card number</label>
                <input 
                    type="text" 
                    id="ccnum" 
                    name="cardnumber" 
                    placeholder="1111-2222-3333-4444"
                    value={cardNumber}
                    onChange={cardNumberOnChange}
                ></input>
                <label htmlFor="expmonth">Exp Month</label>
                <input 
                    type="text" 
                    id="expmonth" 
                    name="expmonth" 
                    placeholder="September"
                    value={expMonth}
                    onChange={expMonthOnChange}
                ></input>
                <div className="row">
                    <div className="col-50">
                        <label htmlFor="expyear">Exp Year</label>
                        <input 
                            type="text" 
                            id="expyear" 
                            name="expyear" 
                            placeholder="2018"
                            value={expYear}
                            onChange={expYearOnChange}
                        ></input>
                    </div>
                    <div className="col-50">
                        <label htmlFor="cvv">CVV</label>
                        <input 
                            type="text" 
                            id="cvv" 
                            name="cvv" 
                            placeholder="352"
                            value={cvvCode}
                            onChange={cvvCodeOnChange}
                        ></input>
                    </div>
                </div>
            </div>
                <div className="submit-container">
                    <button type="submit" className="btn">Save Payment Info</button>
                </div>
        </form>
    )
}

export default PaymentForm;

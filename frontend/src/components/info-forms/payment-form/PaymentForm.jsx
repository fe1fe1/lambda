import "../InfoForms.scss";

const PaymentForm = () => {
    return (
        <form className="checkout-form block-container">
            <div className="col-50">
                <h3>Payment</h3>
                <label htmlFor="cname">Name on Card</label>
                <input type="text" id="cname" name="cardname" placeholder="John More Doe"></input>
                <label htmlFor="ccnum">Credit card number</label>
                <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444"></input>
                <label htmlFor="expmonth">Exp Month</label>
                <input type="text" id="expmonth" name="expmonth" placeholder="September"></input>
                <div className="row">
                    <div className="col-50">
                        <label htmlFor="expyear">Exp Year</label>
                        <input type="text" id="expyear" name="expyear" placeholder="2018"></input>
                    </div>
                    <div className="col-50">
                        <label htmlFor="cvv">CVV</label>
                        <input type="text" id="cvv" name="cvv" placeholder="352"></input>
                    </div>
                </div>
            </div>
                <div className="submit-container">
                    <button type="submit" className="btn">Save</button>
                </div>
        </form>
    )
}

export default PaymentForm;

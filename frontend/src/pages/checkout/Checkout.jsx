import "./Checkout.scss";

const Checkout = () => {
    return (
        <div className="checkout-container">
            <div className="row">
                <div className="container">
                    <form className="checkout-form block-container">
        
                        <div className="row">
                            <div className="col-50">
                                <h3>Billing Address</h3>
                                <label htmlFor="fname"> Full Name</label>
                                <input type="text" id="fname" name="firstname" placeholder="John M. Doe"></input>
                                <label htmlFor="email"> Email</label>
                                <input type="text" id="email" name="email" placeholder="john@example.com"></input>
                                <label htmlFor="adr"> Address</label>
                                <input type="text" id="adr" name="address" placeholder="542 W. 15th Street"></input>
                                <label htmlFor="city"> City</label>
                                <input type="text" id="city" name="city" placeholder="New York"></input>
        
                                <div className="row">
                                    <div className="col-50">
                                        <label htmlFor="state">State</label>
                                        <input type="text" id="state" name="state" placeholder="NY"></input>
                                    </div>
                                    <div className="col-50">
                                        <label htmlFor="zip">Zip</label>
                                        <input type="text" id="zip" name="zip" placeholder="10001"></input>
                                    </div>
                                </div>
                            </div>
        
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
        
                        </div>
                        <button type="submit" className="btn">Checkout</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Checkout;

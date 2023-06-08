import "./Settings.scss";
import ShippingForm from "../../components/settings/shipping/ShippingForm";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentShipping } from "../../features/shipping/shippingSlice";

const UserInfo = () => {
    const shippingInfoState = useSelector(selectCurrentShipping);
    const [address, setAddress] = useState(shippingInfoState.address);
    const [city, setCity] = useState(shippingInfoState.city);
    const [postalCode, setPostalCode] = useState(shippingInfoState.postalCode);
    const [country, setCountry] = useState(shippingInfoState.country);

    const addressOnChange = (e) => { setAddress(e.target.value) }; 
    const cityOnChange = (e) => { setCity(e.target.value) }; 
    const postalCodeOnChange = (e) => { setPostalCode(e.target.value) }; 
    const countryOnChange = (e) => { setCountry(e.target.value) }; 

    console.log(address);

    return (
        <div className="checkout-container">
            <div className="row">
                <div className="container">
                    <form className="checkout-form block-container">
                         <div className="row">
                            <ShippingForm 
                                shippingInfo={{address, city, postalCode, country}} 
                                handleOnChange={{
                                                    addressOnChange, 
                                                    cityOnChange,
                                                    postalCodeOnChange,
                                                    countryOnChange,
                                                }}/> 
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
                        <button type="submit" className="btn">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserInfo;

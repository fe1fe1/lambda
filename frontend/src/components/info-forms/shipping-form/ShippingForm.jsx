import "../InfoForms.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentShipping, setShipping } from "../../../features/shipping/shippingSlice";

const ShippingForm = (props) => {
    const shippingInfoState = useSelector(selectCurrentShipping);
    const [address, setAddress] = useState(shippingInfoState.address);
    const [city, setCity] = useState(shippingInfoState.city);
    const [postalCode, setPostalCode] = useState(shippingInfoState.postalCode);
    const [country, setCountry] = useState(shippingInfoState.country);

    const dispatch = useDispatch();

    const addressOnChange = (e) => { setAddress(e.target.value) }; 
    const cityOnChange = (e) => { setCity(e.target.value) }; 
    const postalCodeOnChange = (e) => { setPostalCode(e.target.value) }; 
    const countryOnChange = (e) => { setCountry(e.target.value) }; 

    const handleOnSubmit = (e) =>{
        e.preventDefault();
        dispatch(setShipping({address, city, postalCode, country}));
        if (props?.onSubmit)
            props.onSubmit(); 
        
    };

    return (
        <form className="checkout-form block-container" onSubmit={(e) => handleOnSubmit(e)}>
            <div className="col-50">
                <h3>Shipping info</h3>
                <label htmlFor="adr"> Address</label>
                <input 
                    type="text" 
                    id="adr" 
                    name="address" 
                    placeholder="542 W. 15th Street" 
                    value={address}
                    onChange={addressOnChange}
                ></input>
                <label htmlFor="city"> City</label>
                <input 
                    type="text" 
                    id="city" 
                    name="city" 
                    placeholder="NY, New York"
                    value={city}
                    onChange={cityOnChange}
                ></input>
            
                <div className="row">
                    <div className="col-50">
                        <label htmlFor="state">Country</label>
                        <input 
                            type="text" id="country" 
                            name="country" 
                            placeholder="United States"
                            value={country}
                            onChange={countryOnChange}
                        ></input>
                    </div>
                    <div className="col-50">
                        <label htmlFor="zip">Postal Code</label>
                        <input 
                            type="text" 
                            id="zip" 
                            name="zip" 
                            placeholder="10001"
                            value={postalCode}
                            onChange={postalCodeOnChange}
                        ></input>
                    </div>
                </div>
            </div>
                <div className="submit-container">
                    <button type="submit" className="btn">Save</button>
                </div>
        </form>
    )
}

export default ShippingForm

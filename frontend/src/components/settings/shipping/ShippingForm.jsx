const ShippingForm = (props) => {
    return (
        <div className="col-50">
            <h3>Shipping info</h3>
            <label htmlFor="adr"> Address</label>
            <input 
                type="text" 
                id="adr" 
                name="address" 
                placeholder="542 W. 15th Street" 
                value={props.shippingInfo.address}
                onChange={props.handleOnChange.addressOnChange}
            ></input>
            <label htmlFor="city"> City</label>
            <input 
                type="text" 
                id="city" 
                name="city" 
                placeholder="NY, New York"
                value={props.shippingInfo.city}
                onChange={props.handleOnChange.cityOnChange}
            ></input>
        
            <div className="row">
                <div className="col-50">
                    <label htmlFor="state">Country</label>
                    <input 
                        type="text" id="country" 
                        name="country" 
                        placeholder="United States"
                        value={props.shippingInfo.city}
                        onChange={props.handleOnChange.cityOnChange}
                    ></input>
                </div>
                <div className="col-50">
                    <label htmlFor="zip">Postal Code</label>
                    <input 
                        type="text" 
                        id="zip" 
                        name="zip" 
                        placeholder="10001"
                        value={props.shippingInfo.city}
                        onChange={props.handleOnChange.cityOnChange}
                    ></input>
                </div>
            </div>
        </div>
    )
}

export default ShippingForm

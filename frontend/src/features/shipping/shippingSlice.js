import { createSlice } from "@reduxjs/toolkit";

const storage = localStorage.getItem('shippingData') ? JSON.parse(localStorage.getItem('shippingData')) : null

const initialState = {
    address: storage?.address ? storage.address : "",
    city: storage?.city ? storage.city : null,
    postalCode: storage?.postalCode ? storage.postalCode : null,
    country: storage?.country ? storage.country : null,
    validShipping: storage?.address && storage?.city && storage?.postalCode && storage?.country ? true : false
};

const shippingSlice = createSlice({
    name: 'shipping',
    initialState,
    reducers: {
        setShipping: (state, action) => {
            const data = action.payload;
            state.address = data.address;
            state.city = data.city;
            state.postalCode = data.postalCode;
            state.country = data.country;

            state.validShipping = state.address && state.city && state.postalCode && state.country ? true : false;

            localStorage.setItem('shippingData', JSON.stringify(data));
        }
    }
});

export const { setShipping } = shippingSlice.actions;

export default shippingSlice.reducer;

export const selectCurrentShipping = (state) => state.shipping;
export const selectValidShipping = (state) => state.shipping.validShipping;

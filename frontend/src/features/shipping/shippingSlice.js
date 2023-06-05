import { createSlice } from "@reduxjs/toolkit";

const storage = localStorage.getItem('shippingData') ? JSON.parse(localStorage.getItem('shippingData')) : null

const initialState = {
    address: storage?.address ? storage.address : null,
    city: storage?.city ? storage.city : null,
    postalCode: storage?.postalCode ? storage.postalCode : null,
    country: storage?.country ? storage.country : null,
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
            localStorage.setItem('shippingData', JSON.stringify(data));
        }
    }
});

export const { setShipping } = shippingSlice.actions;

export default shippingSlice.reducer;

export const selectCurrentShipping = (state) => state.shipping;

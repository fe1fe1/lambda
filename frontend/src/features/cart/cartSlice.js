import { createSlice } from "@reduxjs/toolkit"

const initialState = { cartItems: [] }

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const item = action.payload;
            const product = state.cartItems.find(p => p.id === item.id)
            if (product)
                state.cartItems = state.cartItems.map(p => p.id === product.id ? item : p)
        }
    }
    ,
})

export default cartSlice.reducer;

export const { addItem } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;

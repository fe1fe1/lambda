import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cartItems: localStorage.getItem('cartData') ? JSON.parse(localStorage.getItem('cartData')) : []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const item = action.payload;
            const product = state.cartItems.find(p => p.id === item.id)
            if (product) {
                state.cartItems = state.cartItems.map(p => p.id === product.id ? item : p)
            } else {
                state.cartItems = [...state.cartItems, item]
            }
            localStorage.setItem('cartData', JSON.stringify(state.cartItems))
        },
        removeItem: (state, action) => {
            state.cartItems = state.cartItems.filter(p => p.id !== action.payload);
            localStorage.setItem('cartData', JSON.stringify(state.cartItems))
        }

    }
    ,
})

export default cartSlice.reducer;

export const { addItem, removeItem } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;

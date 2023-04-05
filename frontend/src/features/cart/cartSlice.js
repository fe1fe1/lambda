import { createSlice } from "@reduxjs/toolkit"

const initialState = { cartItems: [] }

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            //
            const item = action.payload;
            const product = state.cartItems.find(p => p.id === item.id)
        }
    }
},
})

export default cartSlice.reducer;

export const selectCartItems = (state) => state.cart.cartItems;

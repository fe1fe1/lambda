import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "products",
    initialState: [],
    reducers: {
        printData: (state) => {
            console.log(state);
        },
    },
});

export const { printData } = productSlice.actions;

export default productSlice.reducer;

import { apiSlice } from "../api/apiSlice";


export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserOrders: builder.query({
            query: userId => `/user/${userId}/orders`,
        }),
        postUserOrder: builder.mutation({
            query: ({ userId, cartItems }) => ({
                url: `/user/${userId}/shipping`,
                method: 'POST',
                body: { cartItems },
            }),
        }),
    }),
});

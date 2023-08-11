import { apiSlice } from "../api/apiSlice";


export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserOrders: builder.query({
            query: userId => `/user/${userId}/orders`,
        }),
        postUserOrder: builder.mutation({
            query: ({ userId, shippingId, orderItems }) => ({
                url: `/user/${userId}/order`,
                method: 'POST',
                body: { shippingId, orderItems },
            }),
        }),
    }),
});

export const { useGetUserOrdersQuery, usePostUserOrderMutation } = ordersApiSlice;

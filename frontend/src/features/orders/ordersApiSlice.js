import { apiSlice } from "../api/apiSlice";


export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserOrders: builder.query({
            query: userId => `/user/${userId}/orders`,
            providesTags: ['Order'],
        }),
        postUserOrder: builder.mutation({
            query: ({ userId, shippingId, orderItems }) => ({
                url: `/user/${userId}/order`,
                method: 'POST',
                body: { shippingId, orderItems },
            }),
        }),
        payUserOrder: builder.mutation({
            query: ({ orderId, paymentMethodId, paymentAmount }) => ({
                url: `/user/order/${orderId}/create-payment-intent`,
                method: 'POST',
                body: { paymentMethodId, paymentAmount },
            }),
            invalidatesTags: ['Order'],
        }),

    }),
});

export const { useGetUserOrdersQuery, usePostUserOrderMutation, usePayUserOrderMutation } = ordersApiSlice;

import { apiSlice } from "../api/apiSlice";


export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getOrders: builder.query({
            query: () => `/orders`,
            providesTags: ['Order'],
        }),
        getUserOrders: builder.query({
            query: userId => `/orders/${userId}`,
            providesTags: ['Order'],
        }),
        postUserOrder: builder.mutation({
            query: ({ userId, shippingId, orderItems }) => ({
                url: `/order/${userId}`,
                method: 'POST',
                body: { shippingId, orderItems },
            }),
        }),
        payUserOrder: builder.mutation({
            query: ({ orderId, paymentMethodId, paymentAmount }) => ({
                url: `/payment/${orderId}/create-payment-intent`,
                method: 'POST',
                body: { paymentMethodId, paymentAmount },
            }),
            invalidatesTags: ['Order'],
        }),
        cancelUserOrder: builder.mutation({
            query: (orderId) => ({
                url: `/order/${orderId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Order'],
        }),

    }),
});

export const {
    useGetOrdersQuery,
    useGetUserOrdersQuery,
    usePostUserOrderMutation,
    usePayUserOrderMutation,
    useCancelUserOrderMutation } = ordersApiSlice;

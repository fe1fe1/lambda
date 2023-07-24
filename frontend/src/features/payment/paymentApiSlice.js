import { apiSlice } from "../api/apiSlice";

export const paymentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        postPayment: builder.mutation({
            query: () => ({
                url: `/user/payment`,
                method: 'POST',
                body: {}
            })
        }),
    }),
});

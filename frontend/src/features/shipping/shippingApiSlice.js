import { apiSlice } from "../api/apiSlice";

export const shippingApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getShipping: builder.query({
            query: userId => `/user/${userId}/shipping`,
        }),
        postShipping: builder.mutation({
            query: ({ userId, address, city, postalCode, country }) => ({
                url: `/user/${userId}/shipping`,
                method: 'POST',
                body: { address, city, postalCode, country },
            }),
        }),
    }),
});

export const { useGetShippingQuery, usePostShippingMutation } = shippingApiSlice;

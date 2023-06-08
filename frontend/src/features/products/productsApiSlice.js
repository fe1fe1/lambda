import { apiSlice } from "../api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query({
            query: () => "/products",
        }),
        getProduct: builder.query({
            query: (productId) => `/product/${productId}`,
        }),
    }),
});

export const { useGetProductsQuery } = extendedApiSlice;

import { apiSlice } from "../api/apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query({
            query: () => "/products",
        }),
        getProduct: builder.query({
            query: (productId) => `/product/${productId}`,
        }),
    }),
});

export const { useGetProductsQuery } = productsApiSlice;

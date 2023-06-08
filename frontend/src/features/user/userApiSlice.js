import { apiSlice } from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signup: builder.mutation({
            query: ({ username, email, password }) => ({
                url: '/user',
                method: 'POST',
                body: { username, email, password },
            })
        }),
        login: builder.mutation({
            query: credentials => ({
                url: '/user/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
});

export const {
    useLoginMutation,
    useSignupMutation
} = userApiSlice;

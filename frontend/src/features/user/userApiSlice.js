import { apiSlice } from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        signup: builder.mutation({
            query: ({ username, email, password }) => ({
                url: '/users',
                method: 'POST',
                body: { username, email, password },
            })
        }),
        login: builder.mutation({
            query: credentials => ({
                url: '/users/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
})

export const {
    useLoginMutation,
    useSignupMutation
} = userApiSlice

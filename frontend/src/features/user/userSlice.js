import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: 'user',
    initialState: { username: null, email: null, token: null, isAdmin: false },
    reducers: {
        setCredentials: (state, action) => {
            const { username, email, token, isAdmin } = action.payload
            state.username = username;
            state.email = email;
            state.token = token;
            state.isAdmin = isAdmin;
        },
        logOut: (state, action) => {
            state.username = null;
            state.email = null;
            state.token = null;
            state.isAdmin = false;
        }
    },
})

export const { setCredentials, logOut } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUsername = (state) => state.user.username;
export const selectCurrentEmail = (state) => state.user.email;
export const selectCurrentToken = (state) => state.user.token;
export const selectCurrentIsAdmin = (state) => state.user.isAdmin;

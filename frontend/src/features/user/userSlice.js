import { createSlice } from "@reduxjs/toolkit"

const storage = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : null

const initialState = {
    id: storage?.id ? storage.id : null,
    name: storage?.name ? storage.name : null,
    email: storage?.email ? storage.email : null,
    token: storage?.token ? storage.token : null,
    is_admin: storage?.is_admin ? storage.is_admin : false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const data = action.payload;
            state.id = data.id;
            state.name = data.name;
            state.email = data.email;
            state.token = data.token;
            state.is_admin = data.is_admin;
            localStorage.setItem('userData', JSON.stringify(data))
        },
        logOut: (state) => {
            state.name = null;
            state.email = null;
            state.token = null;
            state.is_admin = false;
            localStorage.setItem('userData', null)
        }
    },
});

export const { setCredentials, logOut } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUserId = (state) => state.user.id;
export const selectCurrentUsername = (state) => state.user.name;
export const selectCurrentEmail = (state) => state.user.email;
export const selectCurrentToken = (state) => state.user.token;
export const selectCurrentIsAdmin = (state) => state.user.is_admin;

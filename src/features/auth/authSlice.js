import { createSlice } from "@reduxjs/toolkit";

const usersFromStorage = JSON.parse(localStorage.getItem("users")) || [];
const loggedUserFromStorage = JSON.parse(localStorage.getItem("loggedUser"));

const authSlice = createSlice({
    name: "auth",
    initialState: {
    users: usersFromStorage,
    user: loggedUserFromStorage,
    },
    
reducers: {
    signup: (state, action) => {
        const exists = state.users.find(
        (u) => u.email === action.payload.email
        );

        if (!exists) {
        state.users.push(action.payload);
        localStorage.setItem("users", JSON.stringify(state.users));
        }
    },

    login: (state, action) => {
        state.user = action.payload;
        localStorage.setItem("loggedUser", JSON.stringify(action.payload));
    },

    logout: (state) => {
        state.user = null;
        localStorage.removeItem("loggedUser");
    },
    },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;

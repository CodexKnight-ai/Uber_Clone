import { createSlice } from "@reduxjs/toolkit";
const storedUser = localStorage.getItem("user");
console.log(storedUser);
const initialState = {
    status:storedUser? "logged in" : "logged out",
    user: storedUser? JSON.parse(storedUser) : null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            state.status = "logged in";
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout(state) {
            state.status = "logged out";
            state.user = null;
            localStorage.removeItem("user");
        }
    }
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
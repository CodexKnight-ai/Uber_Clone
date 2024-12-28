import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage if available
const storedCaptain = JSON.parse(localStorage.getItem("captain"));
const initialState = storedCaptain
  ? {
      isAuthenticated: true,
      captain: storedCaptain.captain,
      token: storedCaptain.token,
    }
  : {
      isAuthenticated: false,
      captain: null,
      token: null,
    };

const captainSlice = createSlice({
  name: "captain",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.captain = action.payload.captain;
      state.token = action.payload.token;

      // Save captain data to localStorage
      localStorage.setItem("captain", JSON.stringify(action.payload));
    },
    logout(state) {
      state.isAuthenticated = false;
      state.captain = null;
      state.token = null;

      // Remove captain data from localStorage
      localStorage.removeItem("captain");
    },
  },
});

export const { login, logout } = captainSlice.actions;
export default captainSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = { userId: null, email: null, isInitialized: false };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logUserIn: (state, action) => {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.isInitialized = true;
    },
    logUserOut: (state) => {
      state.userId = initialState.userId;
      state.email = initialState.email;
      state.isInitialized = true;
    },
  },
});

export const { logUserIn, logUserOut } = authSlice.actions;

const reducer = authSlice.reducer;

export default reducer;
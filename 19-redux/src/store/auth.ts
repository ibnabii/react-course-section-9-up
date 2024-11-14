import { createSlice } from "@reduxjs/toolkit";

export type AuthStateType = {
  isAuthenticated: boolean;
};

const AUTH_INITIAL_STATE: AuthStateType = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: AUTH_INITIAL_STATE,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;

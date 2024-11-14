import { createSlice } from "@reduxjs/toolkit";

const UI_INITIAL_STATE = {
  showCart: false,
};

const uiSlice = createSlice({
  name: "UI",
  initialState: UI_INITIAL_STATE,
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

export default uiSlice.reducer;
export const uiActions = uiSlice.actions;

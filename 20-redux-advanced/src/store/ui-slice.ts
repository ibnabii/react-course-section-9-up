import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NotificationType = {
  status: "pending" | "success" | "error";
  title: string;
  message: string;
};

type UIStateType = {
  showCart: boolean;
  notification: NotificationType | null;
};

const UI_INITIAL_STATE: UIStateType = {
  showCart: false,
  notification: null,
};

const uiSlice = createSlice({
  name: "UI",
  initialState: UI_INITIAL_STATE,
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
    showNotification(state, action: PayloadAction<NotificationType>) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export default uiSlice.reducer;
export const uiActions = uiSlice.actions;

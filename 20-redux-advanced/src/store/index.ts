import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart-slice.ts";
import uiReducer from "./ui-slice.ts";

const store = configureStore({
  reducer: { cart: cartReducer, ui: uiReducer },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
// export type DispatchType = typeof store.dispatch;

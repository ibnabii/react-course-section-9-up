import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart.ts";

const store = configureStore({
  // for single slice
  // reducer: counterSlice.reducer,
  //   for multiple ces
  reducer: { cart: cartReducer },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
// export type DispatchType = typeof store.dispatch;

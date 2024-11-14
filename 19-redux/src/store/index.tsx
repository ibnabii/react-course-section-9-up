// // For version without toolkit
// import { createStore, Reducer } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter.ts";
import authReducer from "./auth.ts";

const store = configureStore({
  // for single slice
  // reducer: counterSlice.reducer,
  //   for multiple ces
  reducer: { counter: counterReducer, auth: authReducer },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

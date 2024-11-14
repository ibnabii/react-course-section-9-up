// // For version without toolkit
// import { createStore, Reducer } from "redux";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

export type CounterStateType = {
  counter: number;
  showCounter: boolean;
};
//
// type SimpleActionType = {
//   type: "INCREMENT" | "DECREMENT" | "TOGGLE_COUNTER";
// };
//
// type IncreaseActionType = {
//   type: "INCREASE";
//   amount: number;
// };
//
// type ActionType = SimpleActionType | IncreaseActionType;

const COUNTER_INITIAL_STATE: CounterStateType = {
  counter: 0,
  showCounter: true,
};

const counterSlice = createSlice({
  name: "counter", //that's just a name of the Slice (counter because it's counter-related)
  initialState: COUNTER_INITIAL_STATE,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action: PayloadAction<{ amount: number }>) {
      state.counter = state.counter + action.payload.amount; // TODO +=
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

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

const store = configureStore({
  // for single slice
  // reducer: counterSlice.reducer,
  //   for multiple ces
  reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
});

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;

// // Version without redux/toolkit
// const counterReducer: Reducer<StateType, ActionType> = (
//   state = INITIAL_STATE,
//   action,
// ) => {
//   if (action.type === "INCREMENT")
//     return { ...state, counter: state.counter + 1 };
//   if (action.type === "DECREMENT")
//     return { ...state, counter: state.counter - 1 };
//   if (action.type === "INCREASE")
//     return { ...state, counter: state.counter + action.amount };
//
//   if (action.type === "TOGGLE_COUNTER")
//     return { ...state, showCounter: !state.showCounter };
//   return state;
// };
//
// const store = createStore(counterReducer);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

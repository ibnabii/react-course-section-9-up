// // For version without toolkit
// import { createStore, Reducer } from "redux";
import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";

export type StateType = {
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

const INITIAL_STATE: StateType = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counter", //that's just a name of the Slice (counter because it's counter-related)
  initialState: INITIAL_STATE,
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

const store = configureStore({
  reducer: counterSlice.reducer,
  //   for multiple
  //   reducer: { counter: counterSlice.reducer, ...}
});

export const counterActions = counterSlice.actions;

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

export type DispatchType = typeof store.dispatch;

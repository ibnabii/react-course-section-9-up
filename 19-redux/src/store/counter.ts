import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export default counterSlice.reducer;
export const counterActions = counterSlice.actions;

import { createStore, Reducer } from "redux";

export type StateType = {
  counter: number;
};

type ActionType = {
  type: "INCREMENT" | "DECREMENT";
};

const INITIAL_STATE: StateType = { counter: 0 };

const counterReducer: Reducer<StateType, ActionType> = (
  state = INITIAL_STATE,
  action,
) => {
  if (action.type === "INCREMENT") return { counter: state.counter + 1 };
  if (action.type === "DECREMENT") return { counter: state.counter - 1 };
  return state;
};

const store = createStore(counterReducer);

export default store;

export type DispatchType = typeof store.dispatch;

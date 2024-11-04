import { createStore, Reducer } from "redux";

export type StateType = {
  counter: number;
};

type SimpleActionType = {
  type: "INCREMENT" | "DECREMENT";
};

type IncreaseActionType = {
  type: "INCREASE";
  amount: number;
};

type ActionType = SimpleActionType | IncreaseActionType;

const INITIAL_STATE: StateType = { counter: 0 };

const counterReducer: Reducer<StateType, ActionType> = (
  state = INITIAL_STATE,
  action,
) => {
  if (action.type === "INCREMENT") return { counter: state.counter + 1 };
  if (action.type === "DECREMENT") return { counter: state.counter - 1 };
  if (action.type === "INCREASE")
    return { counter: state.counter + action.amount };
  return state;
};

const store = createStore(counterReducer);

export default store;

export type DispatchType = typeof store.dispatch;

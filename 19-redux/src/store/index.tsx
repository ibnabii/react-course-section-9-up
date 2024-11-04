import { createStore, Reducer } from "redux";

export type StateType = {
  counter: number;
  showCounter: boolean;
};

type SimpleActionType = {
  type: "INCREMENT" | "DECREMENT" | "TOGGLE_COUNTER";
};

type IncreaseActionType = {
  type: "INCREASE";
  amount: number;
};

type ActionType = SimpleActionType | IncreaseActionType;

const INITIAL_STATE: StateType = { counter: 0, showCounter: true };

const counterReducer: Reducer<StateType, ActionType> = (
  state = INITIAL_STATE,
  action,
) => {
  if (action.type === "INCREMENT")
    return { ...state, counter: state.counter + 1 };
  if (action.type === "DECREMENT")
    return { ...state, counter: state.counter - 1 };
  if (action.type === "INCREASE")
    return { ...state, counter: state.counter + action.amount };

  if (action.type === "TOGGLE_COUNTER")
    return { ...state, showCounter: !state.showCounter };
  return state;
};

const store = createStore(counterReducer);

export default store;

export type DispatchType = typeof store.dispatch;

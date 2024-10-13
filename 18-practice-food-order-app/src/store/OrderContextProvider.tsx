import { MealType } from "../components/Meal.tsx";
import { createContext, Dispatch, ReactNode, useReducer } from "react";

export type MealOrder = {
  meal: MealType;
  quantity: number;
};
type OrderStateType = {
  mealOrderList: MealOrder[];
  cartModalOpened: boolean;
  orderFormModalOpened: boolean;
};

const initialOrderState: OrderStateType = {
  mealOrderList: [],
  cartModalOpened: false,
  orderFormModalOpened: false,
};

type AddMealActionType = {
  type: "ADD";
  meal: MealType;
};

type RemoveMealActionType = {
  type: "REMOVE";
  mealID: MealType["id"];
};

type UIActionType = {
  type: "CART" | "FORM";
  open: boolean;
};

type GeneralActionType = {
  type: "RESET";
};

type MealActionType = AddMealActionType | RemoveMealActionType;

type OrderActionType = MealActionType | UIActionType | GeneralActionType;

function orderReducer(
  state: OrderStateType,
  action: OrderActionType,
): OrderStateType {
  if (action.type === "RESET") {
    return initialOrderState;
  }
  if (action.type === "CART")
    return {
      ...state,
      cartModalOpened: action.open,
    };

  if (action.type === "FORM")
    return {
      ...state,
      orderFormModalOpened: action.open,
    };

  if (action.type === "ADD") {
    const currentMealOrder = state.mealOrderList.find(
      (mealOrder) => mealOrder.meal.id === action.meal.id,
    );
    if (currentMealOrder) {
      return {
        ...state,
        mealOrderList: [
          ...state.mealOrderList.map((mealOrder) => {
            if (mealOrder.meal.id === action.meal.id) {
              return {
                ...mealOrder,
                quantity: mealOrder.quantity + 1,
              };
            } else return mealOrder;
          }),
        ],
      };
    } else
      return {
        ...state,
        mealOrderList: [
          ...state.mealOrderList,
          { meal: action.meal, quantity: 1 },
        ],
      };
  }
  if (action.type === "REMOVE") {
    const currentMealOrder = state.mealOrderList.find(
      (mealOrder) => mealOrder.meal.id === action.mealID,
    );
    const currentQuantity = currentMealOrder!.quantity;
    if (currentQuantity === 1) {
      return {
        ...state,
        mealOrderList: state.mealOrderList.filter(
          (mealOrder) => mealOrder.meal.id !== action.mealID,
        ),
      };
    } else {
      return {
        ...state,
        mealOrderList: state.mealOrderList.map((mealOrder) => {
          if (mealOrder.meal.id === action.mealID) {
            return {
              ...mealOrder,
              quantity: currentQuantity - 1,
            };
          } else return mealOrder;
        }),
      };
    }
  }
  return state;
}

export const OrderContext = createContext<
  | { orderState: OrderStateType; dispatch: Dispatch<OrderActionType> }
  | undefined
>(undefined);

export default function OrderContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [orderState, dispatch] = useReducer(orderReducer, initialOrderState);
  return (
    <OrderContext.Provider value={{ orderState, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
}

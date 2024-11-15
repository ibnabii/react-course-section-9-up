import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice.ts";
import { DispatchType } from "./index.ts";

type CartItemType = {
  title: string;
  quantity: number;
  price: number;
};

type CartStateType = {
  products: CartItemType[];
};

const CART_INITIAL_STATE: CartStateType = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: CART_INITIAL_STATE,
  reducers: {
    addToCart(state, action: PayloadAction<{ title: string; price: number }>) {
      const oldCartItem = state.products.find(
        (item) => item.title == action.payload.title,
      );
      if (oldCartItem) {
        oldCartItem.quantity++;
      } else state.products.push({ ...action.payload, quantity: 1 });
    },
    removeFromCart(state, action: PayloadAction<{ title: string }>) {
      // const newProducts = state.products.map((item) => {
      //   if (item.title !== action.payload.title) return item;
      //   return { ...item, quantity: item.quantity - 1 };
      // });
      // state.products = newProducts.filter((item) => item.quantity > 0);
      const existingItem = state.products.find(
        (item) => item.title == action.payload.title,
      );
      if (existingItem) {
        existingItem.quantity--;
      }
      state.products = state.products.filter((item) => item.quantity > 0);
    },
  },
});

export const itemsCount = (state: CartStateType): number => {
  return state.products.reduce((total, item) => total + item.quantity, 0);
};

export const sendCartData = (cartData: CartStateType) => {
  return async (dispatch: DispatchType) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      }),
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://udemyreactcourse20-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        { method: "PUT", body: JSON.stringify(cartData) },
      );
      if (!response.ok) {
        throw new Error("Failed to update cart.");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        }),
      );
    } catch (error) {
      if (error instanceof Error)
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: error.message,
          }),
        );
      else
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Unknown error",
          }),
        );
    }
  };
};

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;

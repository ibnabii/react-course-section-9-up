import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItemType = {
  title: string;
  quantity: number;
  price: number;
};

type CartStateType = {
  showCart: boolean;
  products: CartItemType[];
};

const CART_INITIAL_STATE: CartStateType = {
  showCart: false,
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: CART_INITIAL_STATE,
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
    addToCart(state, action: PayloadAction<{ title: string; price: number }>) {
      const oldCartItem = state.products.find(
        (item) => item.title == action.payload.title,
      );
      if (oldCartItem) {
        state.products = state.products.map((item) => {
          if (item.title == action.payload.title)
            return { ...item, quantity: item.quantity + 1 };
          else return item;
        });
      } else
        state.products = [
          ...state.products,
          { ...action.payload, quantity: 1 },
        ];
    },
    removeFromCart(state, action: PayloadAction<{ title: string }>) {
      const newProducts = state.products.map((item) => {
        if (item.title !== action.payload.title) return item;
        return { ...item, quantity: item.quantity - 1 };
      });
      state.products = newProducts.filter((item) => item.quantity > 0);
    },
  },
});

export const itemsCount = (state: CartStateType): number => {
  return state.products.reduce((total, item) => total + item.quantity, 0);
};

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;

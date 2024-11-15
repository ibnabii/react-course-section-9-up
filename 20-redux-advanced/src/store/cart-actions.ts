import { DispatchType } from "./index.ts";
import { uiActions } from "./ui-slice.ts";
import { CartStateType } from "./cart-slice.ts";

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

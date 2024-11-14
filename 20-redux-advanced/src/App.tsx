import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification.tsx";

import { RootState } from "./store";
import { uiActions } from "./store/ui-slice.ts";

function App() {
  const showCart = useSelector((state: RootState) => state.ui.showCart);
  const notification = useSelector((state: RootState) => state.ui.notification);
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        }),
      );
      const response = await fetch(
        "https://udemyreactcourse20-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        { method: "PUT", body: JSON.stringify(cart) },
      );
      if (!response.ok) {
        throw new Error("Failed to update cart.");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        }),
      );

      return await response.json();
    };

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: error.message,
        }),
      );
    });
  }, [cart, dispatch]);

  return (
    <>
      {notification && <Notification {...notification} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;

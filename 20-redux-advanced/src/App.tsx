import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification.tsx";

import { DispatchType, RootState } from "./store";

import { sendCartData } from "./store/cart-actions.ts";

function App() {
  const showCart = useSelector((state: RootState) => state.ui.showCart);
  const notification = useSelector((state: RootState) => state.ui.notification);
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch: DispatchType = useDispatch();
  const isInitial = useRef<boolean>(true);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      console.log("initial");
      return;
    }

    console.log("not initial");
    dispatch(sendCartData(cart));
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

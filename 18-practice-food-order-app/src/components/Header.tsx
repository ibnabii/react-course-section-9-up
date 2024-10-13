import headerImg from "../assets/logo.jpg";
import { OrderContext } from "../store/OrderContextProvider.tsx";
import { useContext } from "react";

export default function Header() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("OrderContext must be used within a QuizContextProvider");
  }

  function openCart() {
    context!.dispatch({ type: "CART", open: true });
  }

  const numberOfItems = context.orderState.mealOrderList.reduce(
    (total, mealOrder) => total + mealOrder.quantity,
    0,
  );

  return (
    <header id="main-header">
      <div id="title">
        <img src={headerImg} alt="logo" id="title" />
        <h1>Reactfood</h1>
      </div>
      <button type="button" className="text-button" onClick={openCart}>
        Cart ({numberOfItems})
      </button>
    </header>
  );
}

import Modal from "./Modal.tsx";
import { useContext } from "react";
import { OrderContext } from "../store/OrderContextProvider.tsx";
import CartItem from "./CartItem.tsx";

export default function Cart() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("OrderContext must be used within a QuizContextProvider");
  }

  function closeCart() {
    context!.dispatch({ type: "CART", open: false });
  }

  function goToCheckout() {
    context!.dispatch({ type: "CART", open: false });
    context!.dispatch({ type: "FORM", open: true });
  }

  const totalPrice = context.orderState.mealOrderList.reduce(
    (total, mealOrder) =>
      total + mealOrder.quantity * Number(mealOrder.meal.price),
    0,
  );

  return (
    <Modal open={context.orderState.cartModalOpened} onClose={closeCart}>
      <div className="cart">
        <h2>Your Cart</h2>
        {context.orderState.mealOrderList.map(({ meal, quantity }) => (
          <CartItem meal={meal} quantity={quantity} key={meal.id} />
        ))}
        <div className="cart-total">${totalPrice.toFixed(2)}</div>
      </div>
      <div className="modal-actions">
        <button className="text-button" onClick={closeCart}>
          Close
        </button>
        {totalPrice ? (
          <button className="button" onClick={goToCheckout}>
            Go to Checkout
          </button>
        ) : undefined}
      </div>
    </Modal>
  );
}

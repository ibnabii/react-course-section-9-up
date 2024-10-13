import { MealOrder, OrderContext } from "../store/OrderContextProvider.tsx";
import { useContext } from "react";

export default function CartItem({ meal, quantity }: MealOrder) {
  const { name, price } = meal;
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("OrderContext must be used within a QuizContextProvider");
  }

  function increaseQuantity() {
    context!.dispatch({ type: "ADD", meal });
  }

  function decreaseQuantity() {
    context!.dispatch({ type: "REMOVE", mealID: meal.id });
  }

  return (
    <div className="cart-item">
      <p>
        {name} - {quantity} x{price}
      </p>
      <div className="cart-item-actions">
        <button onClick={decreaseQuantity}>-</button>
        <p>{quantity}</p>
        <button onClick={increaseQuantity}>+</button>
      </div>
    </div>
  );
}

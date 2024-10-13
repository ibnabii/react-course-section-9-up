import { OrderContext } from "../store/OrderContextProvider.tsx";
import { useContext } from "react";

export type MealType = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
};

type MealProps = {
  meal: MealType;
};
export default function Meal({ meal }: MealProps): JSX.Element {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("OrderContext must be used within a QuizContextProvider");
  }

  function handleAddToCart() {
    context!.dispatch({ type: "ADD", meal: meal });
  }

  return (
    <li className="meal-item" key={meal.id}>
      <article>
        <img
          src={`http://localhost:3000/${meal.image}`}
          alt="Tasty image of a meal"
        />
        <h3>{meal.name}</h3>
        <p className="meal-item-price">{meal.price}</p>
        <p className="meal-item-description">{meal.description}</p>
        <button className="button" onClick={handleAddToCart}>
          Add to cart
        </button>
      </article>
    </li>
  );
}

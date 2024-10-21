import { useHttp } from "../hooks/useHttp.ts";
import Meal, { MealType } from "./Meal.tsx";

const requestConfig = {};
export default function Meals() {
  const {
    data: meals,
    isLoading: isFetching,
    error,
  } = useHttp<MealType[]>("http://localhost:3000/meals", requestConfig, []);

  if (isFetching) {
    return <p className="center">Loading available meals...</p>;
  }

  return (
    <ul id="meals">
      {meals!.map((meal) => (
        <Meal meal={meal} key={meal.id} />
      ))}
    </ul>
  );
}

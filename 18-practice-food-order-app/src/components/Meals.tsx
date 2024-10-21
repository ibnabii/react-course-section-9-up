import { useHttp } from "../hooks/useHttp.ts";
import Meal, { MealType } from "./Meal.tsx";
import Error from "./Error.tsx";

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

  if (error) {
    return <Error title="Error" message={error} />;
  }
  return (
    <ul id="meals">
      {meals!.map((meal) => (
        <Meal meal={meal} key={meal.id} />
      ))}
    </ul>
  );
}

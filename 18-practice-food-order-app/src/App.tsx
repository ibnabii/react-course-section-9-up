import Header from "./components/Header.tsx";
import Meal, { MealType } from "./components/Meal.tsx";
// import meals from "../backend/data/available-meals.json";
import OrderContextProvider from "./store/OrderContextProvider.tsx";
import Cart from "./components/Cart.tsx";
import CheckoutForm from "./components/CheckoutForm.tsx";
// import useFetch from "./hooks/useFetch.ts";
import Success from "./components/Success.tsx";
import { useHttp } from "./hooks/useHttp.ts";
import Meals from "./components/Meals.tsx";

// async function fetchMeals() {
//   const response = await fetch("http://localhost:3000/meals");
//   const resData = await response.json();
//
//   if (!response.ok) {
//     throw new Error("Failed to fetch user places");
//   }
//
//   return resData;
// }

function App() {
  // const { isFetching, error, fetchedData: meals } = useFetch(fetchMeals);

  return (
    <OrderContextProvider>
      <Header />
      <Meals />
      <Cart />
      <CheckoutForm />
      <Success />
    </OrderContextProvider>
  );
}

export default App;

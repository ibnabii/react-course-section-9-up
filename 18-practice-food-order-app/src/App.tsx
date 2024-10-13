import Header from "./components/Header.tsx";
import Meal from "./components/Meal.tsx";
// import meals from "../backend/data/available-meals.json";
import OrderContextProvider from "./store/OrderContextProvider.tsx";
import Cart from "./components/Cart.tsx";
import CheckoutForm from "./components/CheckoutForm.tsx";
import useFetch from "./hooks/useFetch.ts";

async function fetchMeals() {
  const response = await fetch("http://localhost:3000/meals");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch user places");
  }

  return resData;
}

function App() {
  const { isFetching, error, fetchedData: meals } = useFetch(fetchMeals);

  return (
    <OrderContextProvider>
      <Header />
      {isFetching && <p>Loading available meals...</p>}
      {error && <p>{error.message}</p>}
      {!isFetching && !error && (
        <ul id="meals">
          {meals.map((meal) => (
            <Meal meal={meal} key={meal.id} />
          ))}
        </ul>
      )}

      <Cart />
      <CheckoutForm />
    </OrderContextProvider>
  );
}

export default App;

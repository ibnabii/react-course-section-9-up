import { useEffect, useState } from "react";
import { MealType } from "../components/Meal.tsx";

export default function useFetch(fetchFn: () => Promise<MealType[]>) {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [fetchedData, setFetchedData] = useState<MealType[]>([]);
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError(
          error instanceof Error ? error : new Error("Failed to fetch data."),
        );
      }
      setIsFetching(false);
    }

    fetchPlaces();
  }, [fetchFn]);
  return { isFetching, error, fetchedData, setFetchedData };
}

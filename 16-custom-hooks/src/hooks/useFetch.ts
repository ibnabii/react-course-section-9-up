import { useEffect, useState } from "react";

import { PlaceType } from "../components/TypesForOldComponents.tsx";

export default function useFetch(fetchFn: () => Promise<PlaceType[]>) {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [fetchedData, setFetchedData] = useState<PlaceType[]>([]);
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

import Places from "./Places.tsx";
import { type PlaceType } from "./TypesForOldComponents.tsx";
import { useEffect, useState } from "react";
import ErrorPage from "./Error.tsx";

// @ts-expect-error just a file
import { sortPlacesByDistance } from "../loc.js";

type AvailablePlacesProps = {
  onSelectPlace: (selectedPlace: PlaceType) => void;
};

export default function AvailablePlaces({
  onSelectPlace,
}: AvailablePlacesProps) {
  const [availablePlaces, setAvailablePlaces] = useState<PlaceType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // fetch("http://localhost:3000/places")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setAvailablePlaces(data.places);
    //   });
    async function fetchPlaces() {
      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:3000/places");

        if (!response.ok) {
          throw new Error("Cannot fetch places.");
        }

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            data.places,
            position.coords.latitude,
            position.coords.longitude,
          );
          setAvailablePlaces(sortedPlaces);
          setIsLoading(false);
        });

        const data = await response.json();
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error as Error);
          setIsLoading(false);
        }
      }
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <ErrorPage title="An error occurred!" message={error.message} />;
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
      loadingText="Fetching places data..."
      isLoading={isLoading}
    />
  );
}

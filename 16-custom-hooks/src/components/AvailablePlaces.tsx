import Places from "./Places.tsx";
import { type PlaceType } from "./TypesForOldComponents.tsx";
import ErrorPage from "./Error.tsx";

// @ts-expect-error just a file
import { sortPlacesByDistance } from "../loc.js";
// @ts-expect-error just a file
import { fetchAvailablePlaces } from "../http";
import useFetch from "../hooks/useFetch.ts";

type AvailablePlacesProps = {
  onSelectPlace: (selectedPlace: PlaceType) => void;
};

async function fetchSortedPlaces(): Promise<PlaceType[]> {
  const places = await fetchAvailablePlaces();

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude,
      );
      resolve(sortedPlaces);
    });
  });
}

export default function AvailablePlaces({
  onSelectPlace,
}: AvailablePlacesProps) {
  const {
    isFetching,
    fetchedData: availablePlaces,
    error,
  } = useFetch(fetchSortedPlaces);

  if (error) {
    return <ErrorPage title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}

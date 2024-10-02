import Places from "./Places.tsx";
import { type PlaceType } from "./TypesForOldComponents.tsx";
import { useEffect, useState } from "react";

type AvailablePlacesProps = {
  onSelectPlace: (selectedPlace: PlaceType) => void;
};

export default function AvailablePlaces({
  onSelectPlace,
}: AvailablePlacesProps) {
  const [availablePlaces, setAvailablePlaces] = useState<PlaceType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // fetch("http://localhost:3000/places")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setAvailablePlaces(data.places);
    //   });
    async function fetchPlaces() {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/places");
      const data = await response.json();
      setAvailablePlaces(data.places);
      setIsLoading(false);
    }

    fetchPlaces();
  }, []);

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

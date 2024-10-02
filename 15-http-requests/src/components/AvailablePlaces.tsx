import Places from "./Places.jsx";
import { type PlaceType } from "./TypesForOldComponents.tsx";
import { useEffect, useState } from "react";

type AvailablePlacesProps = {
  onSelectPlace: (selectedPlace: PlaceType) => void;
};

export default function AvailablePlaces({
  onSelectPlace,
}: AvailablePlacesProps) {
  const [availablePlaces, setAvailablePlaces] = useState<PlaceType[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/places")
      .then((response) => response.json())
      .then((data) => {
        setAvailablePlaces(data.places);
      });
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}

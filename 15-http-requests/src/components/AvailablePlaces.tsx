import Places from "./Places.jsx";
import { type PlaceType } from "./TypesForOldComponents.tsx";

type AvailablePlacesProps = {
  onSelectPlace: (selectedPlace: PlaceType) => void;
};

export default function AvailablePlaces({
  onSelectPlace,
}: AvailablePlacesProps) {
  return (
    <Places
      title="Available Places"
      places={[]}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}

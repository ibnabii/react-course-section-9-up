import { useRef, useState, useCallback } from "react";

import Places from "./components/Places.tsx";
import Modal from "./components/Modal.tsx";
import DeleteConfirmation from "./components/DeleteConfirmation.tsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.tsx";
// @ts-expect-error helper file in js
import { fetchUserPlaces, updateUserPlaces } from "./http.js";
import ErrorPage from "./components/Error.jsx";
import { PlaceType } from "./components/TypesForOldComponents.tsx";
import useFetch from "./hooks/useFetch.ts";

function App() {
  const selectedPlace = useRef<PlaceType>();

  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState<Error | null>(
    null,
  );
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const {
    isFetching,
    error,
    fetchedData,
    setFetchedData: setUserPlaces,
  } = useFetch(fetchUserPlaces);
  function handleStartRemovePlace(place: PlaceType) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace: PlaceType) {
    // await updateUserPlaces([selectedPlace, ...userPlaces]);

    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      await updateUserPlaces([selectedPlace, ...fetchedData]);
    } catch (error) {
      setUserPlaces(fetchedData);
      setErrorUpdatingPlaces(
        error instanceof Error ? error : new Error("Failed to update places."),
      );
    }
  }

  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      setUserPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter(
          (place) => place.id !== selectedPlace.current!.id,
        ),
      );

      try {
        await updateUserPlaces(
          fetchedData.filter((place) => place.id !== selectedPlace.current!.id),
        );
      } catch (error) {
        setUserPlaces(fetchedData);
        setErrorUpdatingPlaces(
          error instanceof Error ? error : new Error("Failed to delete place."),
        );
      }

      setModalIsOpen(false);
    },
    [fetchedData, setUserPlaces],
  );

  function handleError() {
    setErrorUpdatingPlaces(null);
  }
  // function handleRemovePlace() {}
  // function handleSelectPlace() {}

  return (
    <>
      <Modal open={errorUpdatingPlaces != null} onClose={handleError}>
        {errorUpdatingPlaces && (
          <ErrorPage
            title="An error occurred!"
            message={errorUpdatingPlaces.message}
            onConfirm={handleError}
          />
        )}
      </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {error && (
          <ErrorPage title="An error occurred!" message={error.message} />
        )}
        {!error && (
          <Places
            title="I'd like to visit ..."
            fallbackText="Select the places you would like to visit below."
            isLoading={isFetching}
            loadingText="Fetching your places..."
            places={fetchedData}
            onSelectPlace={handleStartRemovePlace}
          />
        )}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;

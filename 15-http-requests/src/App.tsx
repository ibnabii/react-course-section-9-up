import { useRef, useState, useCallback, useEffect } from "react";

import Places from "./components/Places.tsx";
import Modal from "./components/Modal.tsx";
import DeleteConfirmation from "./components/DeleteConfirmation.tsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.tsx";
import ErrorPage from "./components/Error.tsx";
import { type PlaceType } from "./components/TypesForOldComponents.tsx";

function App() {
  const selectedPlace = useRef<PlaceType | null>(null);

  const [userPlaces, setUserPlaces] = useState<PlaceType[]>([]);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState<Error | null>(
    null,
  );
  const [isFetchingUserPlaces, setIsFetchingUserPlaces] =
    useState<boolean>(false);
  const [errorFetchingUserPlaces, setErrorFetchingUserPlaces] =
    useState<Error | null>(null);
  // const [isFetchingUserPlaces, setIsFetchingUserPlaces] =
  //   useState<boolean>(false);

  useEffect(() => {
    async function fetchUserPlaces() {
      setIsFetchingUserPlaces(true);
      try {
        const response = await fetch("http://localhost:3000/user-places");
        const data = await response.json();
        setUserPlaces(data.places);
      } catch (error) {
        console.log("error: ", error);
        setErrorFetchingUserPlaces(
          Error("Failed to fetch user-selected places, setting them to empty."),
        );
      }
      setIsFetchingUserPlaces(false);
    }

    fetchUserPlaces();
  }, []);

  function handleStartRemovePlace(place: PlaceType) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }
  function handleCloseErrorModal() {
    setErrorUpdatingPlaces(null);
  }

  function handleCloseFetchingErrorModal() {
    setErrorFetchingUserPlaces(null);
  }

  async function saveUserPlaces(places: PlaceType[]) {
    const response = await fetch("http://localhost:3000/user-places", {
      method: "PUT",
      body: JSON.stringify({ places }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = await response.json();

    if (!response.ok) {
      throw new Error("Failed to update user data.");
    }

    return resData.message;
  }

  async function handleSelectPlace(selectedPlace: PlaceType) {
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
      await saveUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces(
        error instanceof Error
          ? error
          : new Error("Failed to update user data."),
      );
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    if (!selectedPlace.current) {
      return; // Ensure that `current` is not null before proceeding
    }
    let newPickedPlaces: PlaceType[] = [];
    setUserPlaces((prevPickedPlaces) => {
      newPickedPlaces = prevPickedPlaces.filter(
        (place) => place.id !== selectedPlace.current!.id,
      );
      return newPickedPlaces;
    });
    setModalIsOpen(false);

    try {
      await saveUserPlaces(newPickedPlaces);
    } catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces(error as Error);
    }
  }, []);

  return (
    <>
      <Modal
        open={errorUpdatingPlaces !== null}
        onClose={handleCloseErrorModal}
      >
        {errorUpdatingPlaces && (
          <ErrorPage
            title={"An error occurred!"}
            message={errorUpdatingPlaces.message || "Unknown error"}
            onConfirm={handleCloseErrorModal}
          />
        )}
      </Modal>
      <Modal
        open={errorFetchingUserPlaces !== null}
        onClose={handleCloseFetchingErrorModal}
      >
        {errorFetchingUserPlaces && (
          <ErrorPage
            title={"An error occurred!"}
            message={errorFetchingUserPlaces.message || "Unknown error"}
            onConfirm={handleCloseFetchingErrorModal}
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
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
          isLoading={isFetchingUserPlaces}
          loadingText="Fetching user-defined places data..."
        />

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;

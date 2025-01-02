import { Link, useNavigate, useParams } from "react-router-dom";

import Modal from "../UI/Modal.tsx";
import EventForm from "./EventForm.tsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CustomError,
  fetchEvent,
  queryClient,
  updateEvent,
} from "../../util/http.ts";
import { useState } from "react";
import LoadingIndicator from "../UI/LoadingIndicator.tsx";
import ErrorBlock from "../UI/ErrorBlock.tsx";

type EditEventRouteParams = {
  id: string;
};

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams<EditEventRouteParams>();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const stringId = id as string;
  const {
    data: eventData,
    isPending: fetchIsPending,
    isError: fetchIsError,
    error: fetchError,
  } = useQuery({
    queryKey: ["events", stringId],
    queryFn: ({ signal }) => fetchEvent({ id: stringId, signal }),
  });
  const customFetchError = fetchError as CustomError;

  const {
    mutate,
    isError: updateIsError,
    isPending: updateIsPending,
    error,
  } = useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
      navigate("../");
    },
  });
  const updateError = error as CustomError;

  function handleSubmit(formData) {
    mutate({ id: stringId, event: formData });
  }

  function handleClose() {
    setIsModalOpen(false);
    navigate("../");
  }

  return (
    <Modal onClose={handleClose} isOpen={isModalOpen}>
      {fetchIsPending && <LoadingIndicator />}
      {fetchIsError && (
        <>
          <ErrorBlock
            title={"Failed to load event data."}
            message={customFetchError.info?.message || "Unknown error"}
          />
          <div className="form-actions">
            <Link to="../" className="button">
              OK
            </Link>
          </div>
        </>
      )}
      {updateIsError && (
        <>
          <ErrorBlock
            title={"Failed to update event data."}
            message={updateError.info?.message || "Unknown error"}
          />
          <div className="form-actions">
            <Link to="../" className="button">
              OK
            </Link>
          </div>
        </>
      )}
      {eventData && (
        <EventForm inputData={eventData} onSubmit={handleSubmit}>
          {!updateIsPending && (
            <>
              <Link to="../" className="button-text">
                Cancel
              </Link>
              <button type="submit" className="button">
                Update
              </button>
            </>
          )}
          {updateIsPending && <p>Updating, please wait...</p>}
        </EventForm>
      )}
    </Modal>
  );
}

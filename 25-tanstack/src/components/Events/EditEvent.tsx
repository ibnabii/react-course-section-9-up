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
import { EventType } from "./EventItem.tsx";

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

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["events"],
    //   });

    // },
    // this one executes immediatelly after calling mutate, before results from backend arrive
    // data is whatever is submitted by mutate()
    onMutate: async (data) => {
      const newEvent = data.event;
      // so that data does not clash with optimistically updated data
      await queryClient.cancelQueries({ queryKey: ["events", stringId] });
      // get old data
      const previousEvent = queryClient.getQueryData([
        "events",
        stringId,
      ]) as EventType;
      // explicitly sets data for particular queryKey
      queryClient.setQueryData(["events", stringId], newEvent);
      return { previousEvent };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(["events", stringId], context?.previousEvent);
    },
    onSettled: () => {
      // sync data with backend
      queryClient.invalidateQueries({ queryKey: ["events", stringId] });
    },
  });
  // const updateError = error as CustomError;

  function handleSubmit(formData) {
    mutate({ id: stringId, event: formData });
    navigate("../");
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

      {eventData && (
        <EventForm inputData={eventData} onSubmit={handleSubmit}>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Update
          </button>
        </EventForm>
      )}
    </Modal>
  );
}

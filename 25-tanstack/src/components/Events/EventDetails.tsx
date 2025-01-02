import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

import Header from "../Header.tsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CustomError,
  deleteEvent,
  fetchEvent,
  queryClient,
} from "../../util/http.ts";
import LoadingIndicator from "../UI/LoadingIndicator.tsx";
import ErrorBlock from "../UI/ErrorBlock.tsx";
import { useState } from "react";
import Modal from "../UI/Modal.tsx";

type EventDetailsRouteParams = {
  id: string;
};

export default function EventDetails() {
  const { id } = useParams<EventDetailsRouteParams>();
  const navigate = useNavigate();
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

  const {
    mutate,
    isError: deleteIsError,
    error: deleteError,
    isPending: deleteIsPending,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],

        // this means invalidated queries are not re-fetched immediatelly, but only when requiored
        refetchType: "none",
      });
      navigate("/events");
    },
  });
  const deleteCustomError = deleteError as CustomError;
  const fetchCustomError = fetchError as CustomError;

  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  function handleStartDeleting() {
    setIsDeleting(true);
  }

  function handleStopDeleting() {
    setIsDeleting(false);
  }

  function handleDelete() {
    mutate({ id: stringId });
  }

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">
        {fetchIsPending && <LoadingIndicator />}
        {fetchIsError && (
          <ErrorBlock
            title="Error loading event."
            message={fetchCustomError.info?.message || "Failed to load event."}
          />
        )}
        {eventData && (
          <>
            <header>
              <h1>{eventData.title}</h1>
              <nav>
                <button onClick={handleStartDeleting}>Delete</button>
                <Link to="edit">Edit</Link>
              </nav>
            </header>
            <div id="event-details-content">
              <img
                src={`http://localhost:3000/${eventData.image}`}
                alt="Image"
              />
              <div id="event-details-info">
                <div>
                  <p id="event-details-location">{eventData.location}</p>
                  <time dateTime={`Todo-DateT$Todo-Time`}>
                    {eventData.date} @ {eventData.time}
                  </time>
                </div>
                <p id="event-details-description">{eventData.description}</p>
              </div>
            </div>
          </>
        )}
      </article>
      {isDeleting && (
        <Modal isOpen={isDeleting} onClose={handleStopDeleting}>
          <h2>Are you sure?</h2>
          <p>
            Do you really want to delete this event? This action cannot be
            undone.
          </p>
          <div className="form-actions">
            {deleteIsError && (
              <ErrorBlock
                title="Failed to delete event."
                message={deleteCustomError.info?.message || "Unknown error."}
              />
            )}

            {deleteIsPending && <p>Deleting, please wait...</p>}
            {!deleteIsPending && (
              <>
                <button onClick={handleStopDeleting} className="button-text">
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="button"
                  disabled={deleteIsPending}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}

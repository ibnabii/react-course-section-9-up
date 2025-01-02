import {
  ActionFunction,
  Link,
  LoaderFunction,
  redirect,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from "react-router-dom";

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
// import LoadingIndicator from "../UI/LoadingIndicator.tsx";
import ErrorBlock from "../UI/ErrorBlock.tsx";
import { EventType } from "./EventItem.tsx";

type EditEventRouteParams = {
  id: string;
};

export default function EditEvent() {
  const navigate = useNavigate();
  // this will be used because react-router-action takes a while
  const { state } = useNavigation();
  const submit = useSubmit();
  const { id } = useParams<EditEventRouteParams>();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const stringId = id as string;
  const {
    data: eventData,
    // isPending: fetchIsPending,
    isError: fetchIsError,
    error: fetchError,
  } = useQuery({
    queryKey: ["events", stringId],
    queryFn: ({ signal }) => fetchEvent({ id: stringId, signal }),
  });
  const customFetchError = fetchError as CustomError;

  // code used in optimistic update, removed because now I use react-router-action
  //   const { mutate } = useMutation({
  //     mutationFn: updateEvent,
  //     // onSuccess: () => {
  //     //   queryClient.invalidateQueries({
  //     //     queryKey: ["events"],
  //     //   });
  //
  //     // },
  //     // this one executes immediatelly after calling mutate, before results from backend arrive
  //     // data is whatever is submitted by mutate()
  //     onMutate: async (data) => {
  //       const newEvent = data.event;
  //       // so that data does not clash with optimistically updated data
  //       await queryClient.cancelQueries({ queryKey: ["events", stringId] });
  //       // get old data
  //       const previousEvent = queryClient.getQueryData([
  //         "events",
  //         stringId,
  //       ]) as EventType;
  //       // explicitly sets data for particular queryKey
  //       queryClient.setQueryData(["events", stringId], newEvent);
  //       return { previousEvent };
  //     },
  //     onError: (_error, _data, context) => {
  //       queryClient.setQueryData(["events", stringId], context?.previousEvent);
  //     },
  //     onSettled: () => {
  //       // sync data with backend
  //       queryClient.invalidateQueries({ queryKey: ["events", stringId] });
  //     },
  //   });
  // const updateError = error as CustomError;

  function handleSubmit(formData) {
    // code used in optimistic update
    // mutate({ id: stringId, event: formData });
    // navigate("../");

    // code used in react-router-action
    submit(formData, { method: "PUT" });
  }

  function handleClose() {
    setIsModalOpen(false);
    navigate("../");
  }

  return (
    <Modal onClose={handleClose} isOpen={isModalOpen}>
      {/*{fetchIsPending && <LoadingIndicator />}*/}
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
          {state === "submitting" && <p>Updating, please wait</p>}
          {state !== "submitting" && (
            <>
              <Link to="../" className="button-text">
                Cancel
              </Link>
              <button type="submit" className="button">
                Update
              </button>
            </>
          )}
        </EventForm>
      )}
    </Modal>
  );
}

export const loader: LoaderFunction = async ({ params }) => {
  // trigger query programatically instead of using useQuery hook
  await queryClient.fetchQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchEvent({ id: params.id!, signal }),
  });
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData) as EventType;
  await updateEvent({ id: params.id!, event: updatedEventData });
  await queryClient.invalidateQueries({ queryKey: ["events"] });
  return redirect("../");
};

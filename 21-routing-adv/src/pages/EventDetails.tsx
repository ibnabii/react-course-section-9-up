import {LoaderFunction, ActionFunction, useRouteLoaderData, redirect} from "react-router-dom";
import EventItem, { EventType } from "../components/EventItem.tsx";

function EventDetailsPage() {
  // const data = useLoaderData() as { event: EventType };
    const data = useRouteLoaderData("event-detail") as LoaderResponseType
  return <EventItem event={data.event} />;
}

export default EventDetailsPage;

// type LoaderArgs = {
//   request: Request;
//   params: EventRouteParams;
// };
//
export type LoaderResponseType = {event: EventType}

export const loader: LoaderFunction = async ({ params }): Promise<LoaderResponseType> => {
  const id = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: "Could not fetch details for selected event.",
      }),
      {
        status: 500,
      },
    );
  }
  return await response.json();
}

export const action: ActionFunction = async ({params, request}) => {
  const response = await fetch("http://localhost:8080/events/" + params.eventId, {method: request.method});
  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: "Could not delete event.",
      }),
      {
        status: 500,
      },
    );
  }
  return redirect("/events")
}
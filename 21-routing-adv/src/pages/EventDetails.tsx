import {LoaderFunction, useRouteLoaderData} from "react-router-dom";
import EventItem, { EventType } from "../components/EventItem.tsx";

export type EventRouteParams = {
  eventId: string;
};

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

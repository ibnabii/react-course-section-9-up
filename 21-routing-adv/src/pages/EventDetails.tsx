import {LoaderFunction, ActionFunction, useRouteLoaderData, redirect, Await} from "react-router-dom";
import EventItem, { EventType } from "../components/EventItem.tsx";
import EventsList from "../components/EventsList.tsx";
import {Suspense} from "react";

function EventDetailsPage() {
  // const data = useLoaderData() as { event: EventType };
  const {event, events} = useRouteLoaderData("event-detail") as {event: EventType, events: EventType[]};
  return (
      <>
        <Suspense fallback={<p style={{textAlign: "center"}}>Loading</p>}>
          <Await resolve={event}>
            {loadedEvent =>
                <EventItem event={loadedEvent}/>
            }
          </Await>
        </Suspense>
        <Suspense fallback={<p style={{textAlign: "center"}}>Loading</p>}>
          <Await resolve={events}>
            {loadedEvents => <EventsList events={loadedEvents}/>}
          </Await>
        </Suspense>
      </>
  );
}

export default EventDetailsPage;

// type LoaderArgs = {
//   request: Request;
//   params: EventRouteParams;
// };
//
export type EventLoaderResponseType = {event: EventType}
export type EventsLoaderResponseType = {events: EventType[]}

async function loadEvent(id: string | undefined): Promise<EventLoaderResponseType> {
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
  const resData = await response.json();
  return resData.event;
}

async function loadEvents(): Promise<EventsLoaderResponseType> {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok)
    throw new Response(JSON.stringify({message: "Could not fetch events"}), {
      status: 500,
    });

  const resData = await response.json();
  return resData.events;
}

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.eventId;
  return {
    events: loadEvents(),
    // adding await here makes navigation to the page only after this has been loaded
    event: await loadEvent(id)
  }
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
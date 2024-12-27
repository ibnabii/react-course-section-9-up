import EventsList from "../components/EventsList";
import { useLoaderData, Await } from "react-router-dom";
import { EventType } from "../components/EventItem.tsx";
import {Suspense} from "react";

type LoaderResponseType = { events: EventType[] };

function EventsPage() {
  const data = useLoaderData() as LoaderResponseType;
  // console.log(data);
  // if ("isError" in data) return <p>{data.message}</p>;

  return (
    <>
      <Suspense fallback={<p style={{textAlign: "center" }}>Loading...</p>}>
        <Await resolve={data.events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
      {/*<EventsList events={events} />*/}
    </>
  );
}

export default EventsPage;

async function loadEvents(): Promise<LoaderResponseType> {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok)
    throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
      status: 500,
    });

  const resData =  await response.json();
  return resData.events;
}

export function loader() {
  return {
  //   the key is arbitrary here
    events: loadEvents(),
  }
}

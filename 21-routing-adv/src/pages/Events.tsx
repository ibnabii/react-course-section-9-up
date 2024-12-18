import EventsList from "../components/EventsList";
import { useLoaderData } from "react-router-dom";
import { EventType } from "../components/EventItem.tsx";

type LoaderResponseType = { events: EventType[] };

function EventsPage() {
  const data = useLoaderData() as LoaderResponseType;
  // console.log(data);
  // if ("isError" in data) return <p>{data.message}</p>;
  const events: EventType[] = data.events;
  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;

export async function loader(): Promise<LoaderResponseType> {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok)
    throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
      status: 500,
    });

  return await response.json();
}

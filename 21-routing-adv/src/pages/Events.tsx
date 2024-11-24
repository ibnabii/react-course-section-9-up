import EventsList from "../components/EventsList";
import { EventType } from "./EventDetails.tsx";
import { useLoaderData } from "react-router-dom";

type LoaderResponseType =
  | { isError: boolean; message: string }
  | { events: EventType[] };

function EventsPage() {
  const data = useLoaderData() as LoaderResponseType;
  console.log(data);
  if ("isError" in data) return <p>{data.message}</p>;
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
  if (!response.ok) return { isError: true, message: "Could not fetch events" };
  return await response.json();
}

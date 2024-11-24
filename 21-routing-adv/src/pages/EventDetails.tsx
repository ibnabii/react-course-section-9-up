import { Link, useParams } from "react-router-dom";

export type EventType = {
  id: string;
  title: string;
  image: string;
  date: string;
};

export type EventRouteParams = {
  eventId: string;
};

function EventDetailsPage() {
  const params = useParams<EventRouteParams>();
  return (
    <>
      <h1>Event Details Page</h1>
      <p>Event ID: {params.eventId}</p>
      <p>
        <Link to="edit">Edit</Link>
      </p>
    </>
  );
}

export default EventDetailsPage;

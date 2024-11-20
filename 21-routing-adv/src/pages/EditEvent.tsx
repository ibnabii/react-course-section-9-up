import { EventRouteParams } from "./EventDetails.tsx";
import { useParams } from "react-router-dom";

function EditEventPage() {
  const params = useParams<EventRouteParams>();
  return (
    <>
      <h1>Edit Event Page</h1>
      <p>Event id: {params.eventId}</p>
    </>
  );
}

export default EditEventPage;

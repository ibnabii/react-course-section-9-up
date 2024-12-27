import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm.tsx";
import {LoaderResponseType} from "./EventDetails.tsx";

function EditEventPage() {
  const data = useRouteLoaderData("event-detail") as LoaderResponseType

  return (
    <>
      <h1>Edit Event Page</h1>
      <EventForm event={data.event} method="PATCH" />
    </>
  );
}

export default EditEventPage;

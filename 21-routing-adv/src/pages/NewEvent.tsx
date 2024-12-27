import {ActionFunction, json, redirect} from "react-router-dom"
import EventForm from "../components/EventForm.tsx";

function NewEventPage() {
  return (
    <>
      <h1>New Event Page</h1>
        <EventForm method="POST" />
    </>
  );
}

export default NewEventPage;

export const action: ActionFunction = async ({request })=>  {
    const data = await request.formData()

    const eventData = {
        title: data.get("title"),
        description: data.get("description"),
        image: data.get("image"),
        date: data.get("date"),
    }

    const response = await fetch("http://localhost:8080/events/", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(eventData)
    });

    if (!response.ok) {
        throw json({message: "Could not save the event", status: 500});
    }

    return redirect("/events");
}


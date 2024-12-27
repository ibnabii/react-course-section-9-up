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


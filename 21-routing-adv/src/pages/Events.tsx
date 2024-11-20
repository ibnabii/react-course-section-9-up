import { Link } from "react-router-dom";

const EVENTS = [
  { id: "e1", title: "First event" },
  { id: "e2", title: "Second event" },
  { id: "e3", title: "Third event" },
];

function EventsPage() {
  return (
    <>
      <h1>Events List Page</h1>
      <ul>
        {EVENTS.map((event) => (
          <li key={event.id}>
            <Link to={event.id}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default EventsPage;

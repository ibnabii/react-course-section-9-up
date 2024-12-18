import classes from "./EventItem.module.css";
import { Link } from "react-router-dom";

export type EventType = {
  id: string;
  title: string;
  image: string;
  date: string;
  description?: string;
};

type EventItemProps = {
  event: EventType;
};

function EventItem({ event }: EventItemProps) {
  function startDeleteHandler() {
    // ...
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}
export default EventItem;

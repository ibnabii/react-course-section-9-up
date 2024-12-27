import {Form, useActionData, useNavigate, useNavigation} from 'react-router-dom';

import classes from './EventForm.module.css';
import {EventType} from "./EventItem.tsx";

type EventFormProps = {
    method: "GET" | "POST"
    event? : EventType
}

type ErrorsType = {
    image?: string;
    description?: string;
    title?: string;
    date?: string;
}
type ServerResponseType = {
    message: string,
    errors?: ErrorsType
}

function EventForm({ method, event }: EventFormProps): JSX.Element {
  const data = useActionData() as ServerResponseType;

  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state == "submitting"


  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method="post" className={classes.form}>
        {data && data.errors && <ul>
            {Object.values(data.errors).map(err => (<li key={err}>{err}</li>))}
        </ul> }
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event ? event.title : ''} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event ? event.image : ''} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event ? event.date : ''} />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event ? event.description : ''} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? "Submitting..." :  "Save"}</button>
      </div>
    </Form>
  );
}

export default EventForm;

import { use, useActionState } from "react";
import { hasMinLength, isNotEmpty } from "../util/validation.js";
import { OpinionsContext } from "../store/opinions-context.jsx";

export function NewOpinion() {
  async function submitAction(prevFormState, formData) {
    const userName = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");
    let errors = [];

    if (!isNotEmpty(userName)) {
      errors.push("Please enter your name.");
    }

    if (!isNotEmpty(title)) {
      errors.push("Please enter a title.");
    }

    if (!isNotEmpty(body)) {
      errors.push("Please enter a opinion.");
    } else if (!hasMinLength(body, 10)) {
      errors.push(
        "Please make sure your opinion is at least 10 characters long.",
      );
    }
    if (errors.length > 0)
      return {
        errors,
        enteredValues: { name: userName, title, opinion: body },
      };
    await addOpinion({ userName, title, body });
    return { errors: null };
  }

  const [formState, formAction, isPending] = useActionState(submitAction, {
    errors: null,
  });
  const { addOpinion } = use(OpinionsContext);

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>
        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <p className="actions">
          <button type="submit" disabled={isPending}>
            Submit
          </button>
        </p>
      </form>
    </div>
  );
}

import { OpinionsContext } from "../store/opinions-context.jsx";
import { use, useActionState } from "react";

export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  const formattedBody = body.replace(/\n/g, "<br />");
  const { upvoteOpinion, downvoteOpinion } = use(OpinionsContext);
  const [upvoteFormState, upvoteFormAction, upvotePending] = useActionState(
    upvoteAction,
    null,
  );
  const [downvoteFormState, downvoteFormAction, downvotePending] =
    useActionState(downvoteAction, null);

  async function upvoteAction() {
    await upvoteOpinion(id);
  }
  async function downvoteAction() {
    await downvoteOpinion(id);
  }

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p dangerouslySetInnerHTML={{ __html: formattedBody }}></p>
      <form className="votes">
        <button
          formAction={upvoteFormAction}
          disabled={upvotePending || downvotePending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{votes}</span>

        <button
          formAction={downvoteFormAction}
          disabled={upvotePending || downvotePending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}

import { useQuery } from "@tanstack/react-query";

import LoadingIndicator from "../UI/LoadingIndicator.tsx";
import ErrorBlock from "../UI/ErrorBlock.tsx";
import EventItem, { EventType } from "./EventItem.tsx";

import { fetchEvents, CustomError, fetchEvent } from "../../util/http.ts";

export default function NewEventsSection() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", { max: 3 }],
    // we could repeat the max
    // queryFn: ({ signal }) => fetchEvents({ signal, maxResults: 3 }),
    // but instead:
    queryFn: ({ signal, queryKey }) => {
      const [, params] = queryKey as [string, { max: number }];
      return fetchEvents({ signal, ...params });
    },
    // only send request again after 5  secs (if component is re-rendered faster, don't), defaults to 0
    staleTime: 5000,
    // how long keep data in cache (default: 5 minutes)
    // gcTime: 30000,
  });

  const customError = error as CustomError;

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={customError.info?.message || "Failed to fetch events."}
      />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event: EventType) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}

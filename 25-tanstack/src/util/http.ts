import { EventType } from "../components/Events/EventItem.tsx";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

type CustomInfo = {
  title: string;
  message: string;
};

export class CustomError extends Error {
  code?: number;
  info?: CustomInfo;

  constructor(message: string, code?: number, info?: CustomInfo) {
    super(message);
    this.code = code;
    this.info = info;
    // Set the prototype explicitly for compatibility
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

type FetchEventsArgs = {
  signal: AbortSignal | null;
  searchTerm?: string;
};

export async function fetchEvents({ signal, searchTerm }: FetchEventsArgs) {
  let url = "http://localhost:3000/events";
  if (searchTerm) {
    url += "?search=" + searchTerm;
  }
  const response = await fetch(url, { signal: signal });

  if (!response.ok) {
    const error = new CustomError(
      "An error occurred while fetching the events",
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}

export async function createNewEvent(eventData: { event: EventType }) {
  const response = await fetch(`http://localhost:3000/events`, {
    method: "POST",
    body: JSON.stringify(eventData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new CustomError("An error occurred while creating the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}

type FetchSelectableImagesArgs = {
  signal: AbortSignal | null;
};

export async function fetchSelectableImages({
  signal,
}: FetchSelectableImagesArgs) {
  const response = await fetch(`http://localhost:3000/events/images`, {
    signal,
  });

  if (!response.ok) {
    const error = new CustomError(
      "An error occurred while fetching the images",
    );
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { images } = await response.json();

  return images;
}

type EventArg = {
  id: string;
};

type FetchEventArgs = { signal: AbortSignal | null } & EventArg;

export async function fetchEvent({ id, signal }: FetchEventArgs) {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    signal,
  });

  if (!response.ok) {
    const error = new CustomError("An error occurred while fetching the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event as EventType;
}

export async function deleteEvent({ id }: EventArg) {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = new CustomError("An error occurred while deleting the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}

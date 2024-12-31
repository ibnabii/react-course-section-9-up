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

export async function fetchEvents() {
  const response = await fetch("http://localhost:3000/events");

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

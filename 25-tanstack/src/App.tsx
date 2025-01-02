import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { QueryClientProvider } from "@tanstack/react-query";

import Events from "./components/Events/Events.tsx";
import EventDetails from "./components/Events/EventDetails.tsx";
import NewEvent from "./components/Events/NewEvent.tsx";
import EditEvent, {
  loader as editEventLoader,
  action as editEventAction,
} from "./components/Events/EditEvent.tsx";
import { queryClient } from "./util/http.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/events" />,
  },
  {
    path: "/events",
    element: <Events />,

    children: [
      {
        path: "/events/new",
        element: <NewEvent />,
      },
    ],
  },
  {
    path: "/events/:id",
    element: <EventDetails />,
    children: [
      {
        path: "/events/:id/edit",
        element: <EditEvent />,
        loader: editEventLoader,
        action: editEventAction,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

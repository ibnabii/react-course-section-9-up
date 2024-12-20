import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root.tsx";
import ErrorPage from "./pages/Error.tsx";
import EventsPage, { loader as eventsLoader } from "./pages/Events.tsx";
import NewEventPage from "./pages/NewEvent.tsx";
import EventDetailsPage from "./pages/EventDetails.tsx";
import EditEventPage from "./pages/EditEvent.tsx";
import HomePage from "./pages/Home.tsx";
import EventLayout from "./pages/EventLayout.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "events",
          element: <EventLayout />,
          children: [
            { index: true, element: <EventsPage />, loader: eventsLoader },
            { path: "new", element: <NewEventPage /> },
            { path: ":eventId", element: <EventDetailsPage /> },
            { path: ":eventId/edit", element: <EditEventPage /> },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

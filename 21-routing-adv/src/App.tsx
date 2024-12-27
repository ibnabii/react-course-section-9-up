import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root.tsx";
import ErrorPage from "./pages/Error.tsx";
import EventsPage, { loader as eventsLoader } from "./pages/Events.tsx";
import NewEventPage from "./pages/NewEvent.tsx";
import EventDetailsPage, {
  loader as eventDetailsLoader,
    action as deleteEventAction,
} from "./pages/EventDetails.tsx";
import EditEventPage from "./pages/EditEvent.tsx";
import HomePage from "./pages/Home.tsx";
import EventLayout from "./pages/EventLayout.tsx";
import { action as manipulateEventAction } from "./components/EventForm.tsx"
import NewsletterPage, {action as newsletterAction } from "./pages/Newsletter.tsx";

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
            { path: "new", element: <NewEventPage />, action: manipulateEventAction },
            {
              path: ":eventId",
              id: "event-detail",
              loader: eventDetailsLoader,
              children: [
                {
                  index: true,
                  element: <EventDetailsPage/>,
                  action: deleteEventAction
                },
                {
                  path: "edit",
                  element: <EditEventPage/>,
                  action: manipulateEventAction
                },
              ]

            }
          ],
        },
        {
          path: 'newsletter',
          element: <NewsletterPage />,
          action: newsletterAction,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

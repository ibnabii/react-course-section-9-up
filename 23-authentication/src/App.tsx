import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

// import AuthenticationPage from "./pages/Authentication.tsx";
const AuthenticationPage = lazy(() => import("./pages/Authentication.tsx"));
// import EditEventPage from "./pages/EditEvent";
const EditEventPage = lazy(() => import("./pages/EditEvent"));
// import ErrorPage from "./pages/Error";
const ErrorPage = lazy(() => import("./pages/Error"));
// import EventDetailPage from "./pages/EventDetail";
const EventDetailPage = lazy(() => import("./pages/EventDetail"));
// import EventsPage from "./pages/Events";
const EventsPage = lazy(() => import("./pages/Events"));
// import EventsRootLayout from "./pages/EventsRoot";
const EventsRootLayout = lazy(() => import("./pages/EventsRoot"));
// import HomePage from "./pages/Home";
const HomePage = lazy(() => import("./pages/Home"));
// import NewEventPage from "./pages/NewEvent";
const NewEventPage = lazy(() => import("./pages/NewEvent"));
// import NewsletterPage from "./pages/Newsletter";
const NewsletterPage = lazy(() => import("./pages/Newsletter"));
// import RootLayout from "./pages/Root";
const RootLayout = lazy(() => import("./pages/Root"));

import { tokenLoader, checkAuthLoader } from "./util/auth.ts";
const defaultFallback = <p>Loading...</p>;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={defaultFallback}>
        {" "}
        <RootLayout />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={defaultFallback}>
        <ErrorPage />
      </Suspense>
    ),
    loader: tokenLoader,
    id: "root",
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={defaultFallback}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "events",
        element: (
          <Suspense fallback={defaultFallback}>
            <EventsRootLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={defaultFallback}>
                <EventsPage />
              </Suspense>
            ),
            loader: () =>
              import("./pages/Events").then((module) => module.loader()),
          },
          {
            path: ":eventId",
            id: "event-detail",
            // loader: eventDetailLoader,
            loader: (args) =>
              import("./pages/EventDetail").then((module) =>
                module.loader(args),
              ),
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={defaultFallback}>
                    <EventDetailPage />
                  </Suspense>
                ),
                // action: deleteEventAction,
                action: (args) =>
                  import("./pages/EventDetail").then((module) =>
                    module.action(args),
                  ),
              },
              {
                path: "edit",
                element: (
                  <Suspense fallback={defaultFallback}>
                    <EditEventPage />
                  </Suspense>
                ),
                action: (args) =>
                  import("./components/EventForm").then((module) =>
                    module.action(args),
                  ),
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: "new",
            element: (
              <Suspense fallback={defaultFallback}>
                <NewEventPage />
              </Suspense>
            ),
            action: (args) =>
              import("./components/EventForm").then((module) =>
                module.action(args),
              ),
            loader: checkAuthLoader,
          },
        ],
      },
      {
        path: "newsletter",
        element: (
          <Suspense fallback={defaultFallback}>
            <NewsletterPage />
          </Suspense>
        ),
        action: (args) =>
          import("./pages/Newsletter").then((module) => module.action(args)),
      },
      {
        path: "auth",
        element: (
          <Suspense fallback={defaultFallback}>
            <AuthenticationPage />
          </Suspense>
        ),
        action: (args) =>
          import("./pages/Authentication.tsx").then((module) =>
            module.action(args),
          ),
      },
      {
        path: "logout",
        action: (args) =>
          import("./pages/Logout").then((module) => module.action(args)),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import { Outlet } from "react-router-dom";
import EventsNavigation from "../components/EventsNavigation.tsx";

function EventLayout() {
  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  );
}

export default EventLayout;

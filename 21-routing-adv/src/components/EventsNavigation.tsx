import classes from "./EventsNavigation.module.css";
import { NavLink, NavLinkRenderProps } from "react-router-dom";

function EventsNavigation() {
  const isActiveClass = ({ isActive }: NavLinkRenderProps) => {
    if (isActive) return classes.active;
    return undefined;
  };
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to="/events" className={isActiveClass} end>
              All Events
            </NavLink>
          </li>
          <li>
            <NavLink to="/events/new" className={isActiveClass}>
              New Event
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;

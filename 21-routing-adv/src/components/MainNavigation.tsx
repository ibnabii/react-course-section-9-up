import classes from "./MainNavigation.module.css";
import { NavLink, NavLinkRenderProps } from "react-router-dom";

function MainNavigation() {
  const isActiveClass = ({ isActive }: NavLinkRenderProps) => {
    if (isActive) return classes.active;
    return undefined;
  };

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to={"/"} className={isActiveClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/events"} className={isActiveClass}>
              Events
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;

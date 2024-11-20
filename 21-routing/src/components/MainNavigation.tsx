import { NavLink, NavLinkRenderProps } from "react-router-dom";

import classes from "./MainNavigation.module.css";

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
            <NavLink to="/" className={isActiveClass} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={isActiveClass}>
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;

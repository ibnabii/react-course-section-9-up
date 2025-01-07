"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import classes from "@/components/main-header/nav-link.module.css";

export default function NavLink({ href, children }) {
  const path = usePathname();
  let className = `${classes.link}`;
  if (path.startsWith(href)) {
    className += ` ${classes.active}`;
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

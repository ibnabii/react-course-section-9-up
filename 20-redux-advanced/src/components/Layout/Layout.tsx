import { ComponentPropsWithoutRef, Fragment } from "react";
import MainHeader from "./MainHeader";

const Layout = ({ children }: ComponentPropsWithoutRef<"main">) => {
  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
    </Fragment>
  );
};

export default Layout;

import React, { FC, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import SideBar from "./SideBar";

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = (props) => {
  const { children } = props;
  console.log("Layout");

  return (
    <div>
      <Header />
      <main className="flex flex-col min-h-screen">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

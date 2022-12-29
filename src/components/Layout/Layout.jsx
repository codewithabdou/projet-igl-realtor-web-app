import React from "react";
import { Navbar } from "../.";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-secondary_1">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;

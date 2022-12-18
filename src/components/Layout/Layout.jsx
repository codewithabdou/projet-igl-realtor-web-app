import React from "react";
import { Navbar } from "../.";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-red-400">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;

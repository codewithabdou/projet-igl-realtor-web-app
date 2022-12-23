import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components";
import { Home, Market } from "./routes";
import { ROUTES } from "./constants";
import { UserContext } from "./global/userContext";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Layout>
        <Routes>
          <Route path={ROUTES.HOME.path} element={<Home />} />
          <Route path={ROUTES.MARKET.path} element={<Market />} />
        </Routes>
      </Layout>
    </UserContext.Provider>
  );
};

export default App;

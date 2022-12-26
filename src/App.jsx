import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components";
import {
  Home,
  Market,
  AdForm,
  AdInfo,
  Admin,
  FavoriteAds,
  MyAds,
  Reception,
  SoonAvailable,
} from "./routes";
import { ROUTES } from "./constants";
import { UserContext } from "./global/userContext";
import "antd/dist/reset.css";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Layout>
        <Routes>
          <Route path={ROUTES.HOME.path} element={<Home />} />
          <Route path={ROUTES.MARKET.path} element={<Market />} />
          <Route path={ROUTES.ADFORM.path} element={<AdForm />} />
          <Route path={ROUTES.ADINFO.path} element={<AdInfo />} />
          <Route path={ROUTES.ADMIN.path} element={<Admin />} />
          <Route path={ROUTES.FAVORITE.path} element={<FavoriteAds />} />
          <Route path={ROUTES.MYADS.path} element={<MyAds />} />
          <Route path={ROUTES.RECEPTION.path} element={<Reception />} />
          <Route path={ROUTES.SOONAV.path} element={<SoonAvailable />} />
        </Routes>
      </Layout>
    </UserContext.Provider>
  );
};

export default App;

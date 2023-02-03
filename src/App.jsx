import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout, Protected } from "./components";
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
import  UserContext  from "./context/userContext";
import "antd/dist/reset.css";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Layout>
        <Routes>
          <Route path={ROUTES.HOME.path} element={<Home />} />
          <Route
            path={ROUTES.MARKET.path}
            element={
              <Protected>
                <Market />
              </Protected>
            }
          />
          <Route
            path={ROUTES.ADFORM.path}
            element={
              <Protected>
                <AdForm />
              </Protected>
            }
          />
          <Route
            path={ROUTES.ADINFO.path}
            element={
              <Protected>
                <AdInfo />
              </Protected>
            }
          />
          <Route path={ROUTES.ADMIN.path} element={<Admin />} />
          <Route
            path={ROUTES.FAVORITE.path}
            element={
              <Protected>
                <FavoriteAds />
              </Protected>
            }
          />
          <Route
            path={ROUTES.MYADS.path}
            element={
              <Protected>
                <MyAds />
              </Protected>
            }
          />
          <Route
            path={ROUTES.RECEPTION.path}
            element={
              <Protected>
                <Reception />
              </Protected>
            }
          />
          <Route path={ROUTES.SOONAV.path} element={<SoonAvailable />} />
        </Routes>
      </Layout>
    </UserContext.Provider>
  );
};

export default App;
